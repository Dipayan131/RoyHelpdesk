import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";
import { useMyContext } from "../context/AppContext";

export default function Navbar() {
  const {setValue, setName, setUserEmail} = useMyContext();

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.success) {
      setValue("Initial Value");
      setName("Default Name");
      setUserEmail("example@example.com");
      // Optionally, redirect or update UI after logout
      window.location.href = '/'; // Redirect to login page or perform any other action
    } else {
      console.error(data.error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4">
        <div className="flex items-center">
            <Image
                src={Logo}
                alt="Roy Helpdesk logo"
                width={70}
                quality={100}
                placeholder="blur"
            />
            <h1 className="ml-2">Roy Helpdesk</h1>
        </div>
        <button className="text-lg" onClick={handleLogout}>
            Logout
        </button>
    </nav>
);

}
