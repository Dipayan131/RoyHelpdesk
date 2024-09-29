"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTicketsData } from "@/app/services/ticketServices/deleteTicketsData";

function DeleteTicketButton({ ticketId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteTicketsData(ticketId)

      if (res.success) {
        // Redirect to the tickets list page and force a reload
        router.refresh();
        router.push('/tickets')
      } else {
        // Handle error
        console.error("Failed to delete the ticket");
      }
    } catch (error) {
      console.error("An error occurred while deleting the ticket", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
      {isDeleting ? "Deleting..." : "Delete Ticket"}
    </button>
  );
}

export default DeleteTicketButton;
