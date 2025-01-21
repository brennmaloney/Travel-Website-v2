import contentful from 'contentful';

export const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_API_TOKEN,
});

export async function getBlogEntries(slug=false) {
    try {
        const query = {
            content_type: 'blogPage',
            ...(slug ? { 'fields.slug': slug } : {})
        };
        const response = await client.getEntries(query);
        return response.items.map(item => item.fields);
    } catch (error) {
        console.error('Error fetching blog entries:', error);
        return [];
    }
}

export async function getCoordinateEntries() {
    try {
        const response = await client.getEntries({
            content_type: 'coordinates',
        });
        return response.items.map(item => item.fields);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return [];
    }
}