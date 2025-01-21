import { getCoordinateEntries } from '$lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        coordinates: await getCoordinateEntries(),
    }
}