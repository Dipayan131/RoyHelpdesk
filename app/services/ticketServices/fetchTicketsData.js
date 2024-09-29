export async function fetchTicketsData(id) {
    try {
        const url = id ? `/api/ticket?id=${id}` : '/api/ticket';

        const response = await fetch(url, {
            next: {
                revalidate: 0
            },
            method: 'GET',
        });

        if (!response.ok) throw new Error('Error fetching data');
        
        const data = await response.json();
        return data; // Ensure this returns the JSON data directly
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, message: error.message }; // Return a meaningful error message
    }
}
