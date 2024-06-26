"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

function DeleteTicketButton({ ticketId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/deleteQuery?id=${ticketId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
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
