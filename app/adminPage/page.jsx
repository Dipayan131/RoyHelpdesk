"use client"; // Make this a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import {
  fetchTicketsData,
  updateTicketsData,
} from "../services/ticketServices/fetchTicketsData";

export default function AdminPage() {
  const router = useRouter();
  const { value } = useMyContext();
  const [tickets, setTickets] = useState([]);
  const [collapsedUsers, setCollapsedUsers] = useState({});
  const [collapsedTabs, setCollapsedTabs] = useState({});

  useEffect(() => {
    if (value !== "Admin") {
      router.push("/");
    }
  }, [value]);

  useEffect(() => {
    const getTickets = async () => {
      const res = await fetchTicketsData();
      setTickets(res.data);
    };

    getTickets();
  }, []);

  // Group tickets by user email
  const groupedTickets = tickets.reduce((acc, ticket) => {
    if (ticket.issue_status !== "solved") {
      // Only include tickets that are not solved
      const userKey = `${ticket.name} (${ticket.email})`;
      acc[userKey] = acc[userKey] || [];
      acc[userKey].push(ticket);
    }
    return acc;
  }, {});

  // Toggle collapse for a specific user
  const toggleCollapseUser = (userKey) => {
    setCollapsedUsers((prev) => ({
      ...prev,
      [userKey]: !prev[userKey],
    }));
  };

  // Toggle collapse for a specific tab
  const toggleCollapseTab = (tabKey) => {
    setCollapsedTabs((prev) => ({
      ...prev,
      [tabKey]: !prev[tabKey],
    }));
  };

  // Determine priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  // Handle Solved
  const handleSolved = async (id) => {
    try {
      const response = await fetch(`/api/ticket`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updateData: { issue_status: "solved" } }),
      });

      if (!response.ok) throw new Error("Error updating data");

      const result = await response.json();
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
      return result;
    } catch (error) {
      console.error("Error updating data:", error);
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
      return { success: false, message: error.message };
    }
  };

  // Handle Not Solved
  const handleNotSolved = async (id) => {
    const message = prompt(
      "Please provide a reason why the issue is not solved:"
    );
    if (message) {
      try {
        const response = await fetch(`/api/ticket`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            updateData: { issue_status: "not solved", message },
          }),
        });

        if (!response.ok) throw new Error("Error updating data");

        const result = await response.json();
        setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
        return result;
      } catch (error) {
        console.error("Error updating data:", error);
        setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
        return { success: false, message: error.message };
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl font-bold my-4">Admin Page</h1>
      <div className="overflow-y-auto max-h-[70vh] mx-auto max-w-4xl space-y-4 p-4 border rounded-md shadow-md">
        {Object.keys(groupedTickets).length > 0 ? (
          Object.entries(groupedTickets).map(([userKey, userTickets]) => (
            <div key={userKey} className="border p-4 rounded-md shadow-md">
              <button
                onClick={() => toggleCollapseUser(userKey)}
                className="flex justify-between items-center w-full text-left font-bold text-lg"
              >
                <span>{userKey}</span>
                <span>{collapsedUsers[userKey] ? "-" : "+"}</span>
              </button>
              {collapsedUsers[userKey] && (
                <div className="mt-2 space-y-2">
                  {userTickets.map((ticket, index) => {
                    const tabKey = `${userKey}-${index}`;
                    return (
                      <div
                        key={tabKey}
                        className={`border ${getPriorityColor(
                          ticket.priority
                        )} rounded-lg p-3 cursor-pointer transition-all duration-300 ease-in-out`}
                        onClick={() => toggleCollapseTab(tabKey)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-blue-700">
                              {ticket.title}
                            </h3>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                        {collapsedTabs[tabKey] && (
                          <div className="mt-3 p-2 bg-gray-50 rounded-md">
                            <p>{ticket.body}</p>
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex gap-2">
                                <button
                                  className="bg-green-500 text-white px-3 py-1 rounded"
                                  onClick={() => handleSolved(ticket._id)}
                                >
                                  Solved
                                </button>
                                <button
                                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                                  onClick={() => handleNotSolved(ticket._id)}
                                >
                                  Not Solved
                                </button>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                                  ticket.priority
                                )}`}
                              >
                                {ticket.priority}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No tickets available</div>
        )}
      </div>
    </div>
  );
}
