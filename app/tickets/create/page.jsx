'use client'

import { useEffect } from 'react';
import CreateForm from './CreateForm'
import { useAppContext, useMyContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

export default function CreateTicket() {
  const {value} = useMyContext()
  const router = useRouter();

  useEffect(() => {

    if (value !== "User") {
        router.push('/');
    }   
}, [value, router]);

  return (
    <>
    <Navbar />
    <main>
      <h2 className="text-center">Open a New Ticket</h2>
      <CreateForm />
    </main>
    </>
  )
}