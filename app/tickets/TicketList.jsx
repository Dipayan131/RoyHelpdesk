"use client";

import Link from "next/link";
import { fetchTicketsData } from "../services/ticketServices/fetchTicketsData";
import { useEffect, useState } from "react";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const res = await fetchTicketsData();
      setTickets(res.data); // Set the fetched tickets to state
    };

    getTickets();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="card my-5">
          <Link href={`/tickets/${ticket._id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body?.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no tickets, yay!</p>
      )}
    </>
  );
}
