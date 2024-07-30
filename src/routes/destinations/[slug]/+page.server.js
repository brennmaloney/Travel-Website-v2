import { client } from '$lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug } = params;
    const response = await client.getEntries({
        content_type: 'blogPage',
        'fields.slug': slug,
    });
    return {
        blogs: response.items[0].fields,
    };
}
