export async function updateTicketsData(id, updateData) {
    try {
        const response = await fetch(`/api/ticket`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, updateData }),
        });

        if (!response.ok) throw new Error('Error updating data');

        const result = await response.json();
        return result; // Ensure this returns the JSON result directly
    } catch (error) {
        console.error("Error updating data:", error);
        return { success: false, message: error.message }; // Return a meaningful error message
    }
}
