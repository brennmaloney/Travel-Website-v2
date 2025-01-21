import { getBlogEntries } from '$lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        blogs: await getBlogEntries(),
    }
}
