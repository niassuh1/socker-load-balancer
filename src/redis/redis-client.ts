import { createClient } from "redis";

export const subscriber = createClient({ url: process.env.REDIS });
export const publisher = createClient({ url: process.env.REDIS });
