import { client } from '$lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const response = await client.getEntries({
        content_type: 'blogPage'
    });
    return { 
        blogs: response.items.map((item) => item.fields) 
    };
}