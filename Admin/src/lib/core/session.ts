'use server';

import { headers } from "next/headers";
import { authClient } from "../auth-client";
import { redirect } from "next/navigation";
import { Role } from "@/types/role";

export const getUserSession = async () => {
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    })

    return data?.user || null;
}

export const getUserToken = async () => {
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    })

    return data?.session?.token || null;
}


export const getUserRole = async () => {
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    })

    return (data?.user as any)?.role || null;
}

export const requireRole = async(role: Role) =>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/login')
    }
    if((user as any)?.role !== role){
        redirect('/unauthorized')
    }
    return user;
}