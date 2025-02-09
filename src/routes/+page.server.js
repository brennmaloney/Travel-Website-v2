import { getCoordinateEntries, getImageCarousel } from '$lib/contentful';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        coordinates: await getCoordinateEntries(),
        images: await getImageCarousel('Places We\'ve Been')
    }
}