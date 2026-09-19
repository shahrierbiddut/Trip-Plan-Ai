'use server';

import { protectedServerQuery } from "../core/server";

export const getBookmarksByUser = async (userId: string) => {
    return await protectedServerQuery(`/api/destinations/bookmark/${userId}`);
}