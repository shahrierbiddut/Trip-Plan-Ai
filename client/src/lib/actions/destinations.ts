import { serverMutation } from "../core/server";

export const addBookmark = async (data: Record<string, unknown>) => {
    return serverMutation(`/api/bookmarks`, data);
}
