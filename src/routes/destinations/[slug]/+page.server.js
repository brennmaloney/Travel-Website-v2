import { client } from '$lib/contentful';
import { getBlogEntries } from '../../../lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug } = params;
    const response = await getBlogEntries(slug);
    return {
        blog: response[0],
    };
}
