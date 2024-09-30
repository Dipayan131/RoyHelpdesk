'use client';

import { notFound } from "next/navigation";
import DeleteTicketButton from "./DeleteTicketButton"; // Adjust the import path accordingly
import { fetchTicketsData } from "@/app/services/ticketServices/fetchTicketsData";
import { useMyContext } from "@/app/context/AppContext";
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/Navbar";

export const dynamicParams = true; // default val = true

async function getTicket(id) {
  const res = await fetchTicketsData(id);

  if (res.data?.success === false && res.data) {
    notFound();
  }

  return res.data; // Return the ticket data directly
}

export default function TicketDetails({ params }) {
  const [ticket, setTicket] = useState(null);
  const { userEmail } = useMyContext();

  useEffect(() => {
    // Fetch ticket data on the client side
    const fetchTicket = async () => {
      const ticketData = await getTicket(params.id);
      setTicket(ticketData);
    };

    fetchTicket();
  }, [params.id]);

  if (!ticket) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <main>
      <Navbar />
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket?.title}</h3>
        <small>Created by {userEmail}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket?.priority}`}>
          {ticket?.priority} priority
        </div>
        <DeleteTicketButton ticketId={ticket?._id} />
        
        {ticket?.message && ticket.message !== "NA" && (
          <div className="my-4 p-2 border rounded-md bg-gray-100 text-gray-700">
            <h4 className="font-semibold">Message:</h4>
            <p>{ticket?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
  
}
