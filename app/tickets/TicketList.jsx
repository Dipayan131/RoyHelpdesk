"use client";

import Link from "next/link";
import { fetchTicketsData } from "../services/ticketServices/fetchTicketsData";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/AppContext";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const { userEmail } = useMyContext();

  useEffect(() => {
    const getTickets = async () => {
      const res = await fetchTicketsData();
      // Filter tickets to show only those with email matching userEmail
      const filteredTickets = res.data.filter(ticket => ticket.email === userEmail);
      setTickets(filteredTickets);
    };

    getTickets();
  }, [userEmail]); // Include userEmail as a dependency

  return (
    <>
      {tickets.map((ticket) => {
        // Determine the status style and text based on issue_status
        let statusStyle = "";
        let statusText = "";

        switch (ticket.issue_status?.toLowerCase()) {
          case "solved":
            statusStyle = "bg-green-100 text-green-600 w-16 justify-center"; // Green background and text
            statusText = "Solved";
            break;
          case "not solved":
            statusStyle = "bg-yellow-100 text-yellow-600 w-28 flex justify-center"; // Yellow background and text
            statusText = "Not Solved";
            break;
          default:
            statusStyle = ""; // No status text or style
            statusText = ""; // No status text
            break;
        }

        return (
          <div key={ticket._id} className="card my-5 relative p-4 border rounded-md shadow">
            <Link href={`/tickets/${ticket._id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body?.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket?.priority} priority
              </div>
            </Link>
            {statusText && (
              <div className={`bottom-2 left-2 px-2 py-1 rounded ${statusStyle}`}>
                {statusText}
              </div>
            )}
          </div>
        );
      })}
      {tickets.length === 0 && (
        <p className="text-center">There are no tickets, yay!</p>
      )}
    </>
  );
}
