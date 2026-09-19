'use server';

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export const serverQuery = async (path: string) => {
    const res = await fetch(`${baseUrl}${path}`);
    return await handleStatusCode(res);
}

// support session code
export const authHeader = async (): Promise<Record<string, string>> => {
    // const cookieStore = await cookies();

    // const token = cookieStore.get("better-auth.session_data");
    const token = await getUserToken();
    console.log(token);
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header as Record<string, string>;
}
// support session code

export const protectedServerQuery = async (path: string) => {

    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeader()
        }
    );
    // console.log(res);
    return await handleStatusCode(res);

}


export const serverMutation = async (path: string, data: Record<string, unknown> = {}, method: string = 'POST') => {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(`${baseUrl}${path}`, options);

    return await handleStatusCode(res);
}

const handleStatusCode = async (res: Response) => {
    if (res.status === 401) {
        redirect('/auth/login');
    }

    if (res.status === 403) {
        redirect('/unauthorized');
    }

    if (res.status === 204) {
        return { success: true };
    }

    const contentType = res.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

    if (!res.ok) {
        const message = typeof body === 'object' && body && 'message' in body
            ? String(body.message)
            : `Request failed with status ${res.status}.`;
        throw new Error(message);
    }

    if (!contentType.includes('application/json')) {
        throw new Error(`Expected a JSON response but received ${contentType || 'an unknown content type'}.`);
    }

    return body;
}
