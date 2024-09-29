export async function deleteTicketsData(id) {
    try {
        const response = await fetch('http://localhost:3000/api/ticket', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error('Error deleting data');

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting data:", error);
        return { success: false };
    }
}
