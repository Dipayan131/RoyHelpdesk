import { notFound } from "next/navigation";
import DeleteTicketButton from "./DeleteTicketButton"; // Adjust the import path accordingly

export const dynamicParams = true; // default val = true

export async function generateStaticParams() {
  const res = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/queries');

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  const res = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/queries?id=${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
        <DeleteTicketButton ticketId={ticket.id} />
      </div>
    </main>
  );
}
