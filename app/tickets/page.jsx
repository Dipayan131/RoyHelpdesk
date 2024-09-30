'use client'

import { Suspense, useEffect } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";
import {useMyContext } from "../context/AppContext";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";

export default function Tickets() {
  const {value} = useMyContext();
  const router = useRouter();

  useEffect(() => {

    if (value !== "User") {
        router.push('/');
    }   
}, [value, router]);

  return (
    <>
    <Navbar />
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
    </>
  );
}
