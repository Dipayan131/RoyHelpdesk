import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";

export default function Tickets() {
  return (
    <main className="w-full">
      <nav className="w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2>Tickets</h2>
            <p>
              <small>Currently open tickets.</small>
            </p>
          </div>
          <Link href="/tickets/create"><button className="btn-primary">Create New Ticket</button></Link>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
