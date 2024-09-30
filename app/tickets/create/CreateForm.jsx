"use client"

import { useAppContext, useMyContext } from "@/app/context/AppContext";
import { createTicketsData } from "@/app/services/ticketServices/createTicketsData";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('low')
  const [isLoading, setIsLoading] = useState(false)
  const {userEmail, name} = useMyContext();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newTicket = {name: name, email: userEmail, message: "NA", issue_status: "NA",  title, body, priority  }

    try {
      const res = await createTicketsData(newTicket);

      if (res.success) {
        router.refresh();
        router.push('/tickets');
      } else {
        console.error(`Failed to add ticket, status code: ${res.status}`);
      }
    } catch (error) {
      console.error('Error while adding ticket:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select 
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button 
        className="btn-primary" 
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}
