'use client'

import { notFound } from "next/navigation";
import DeleteTicketButton from "./DeleteTicketButton"; // Adjust the import path accordingly
import { fetchTicketsData } from "@/app/services/ticketServices/fetchTicketsData";

export const dynamicParams = true; // default val = true

// export async function generateStaticParams() {
//   const res = await fetchTicketsData();

//   const tickets = res.data;

//   return tickets.map((ticket) => ({
//     id: ticket._id,
//   }));
// }

async function getTicket(id) {
  const res = await fetchTicketsData(id);
  
  if (res.data?.success === false && res.data) {
    notFound();
  }

  return res.data; // Return the ticket data directly
}


export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket?.title}</h3>
        <small>Created by {ticket?.user_email}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket?.priority}`}>
          {ticket?.priority} priority
        </div>
        <DeleteTicketButton ticketId={ticket?._id} />
      </div>
    </main>
  );
}
