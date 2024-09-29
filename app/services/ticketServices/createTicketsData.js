export async function createTicketsData(payload) {
    try {
        const response = await fetch('http://localhost:3000/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Error creating data');

        

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error creating data:", error);
        return { success: false };
    }
}
