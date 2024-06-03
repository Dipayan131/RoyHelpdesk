"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid package

export default function CreateForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const id = uuidv4(); // Generate a unique id
    const newTicket = { id, title, body, priority, user_email: 'mario@netninja.dev' }

    try {
      const res = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/query', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket)
      })

      console.log(`Response status: ${res.status}`); // Log the response status

      if (res.status === 200) {
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
