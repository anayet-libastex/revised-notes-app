import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router"

const Navbar = ({user, setUser}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/")
    },50);
    return () => clearTimeout(delay);
  }, [search, navigate, user])

  useEffect(() => {
    setSearch('')
  }, [user])

  const handleLogout = () => {
     localStorage.removeItem("token");
     setUser(null);
     navigate("/login")
  }
  return (
    <div>
      <nav className="bg-gray-900 p-4 text-white shadow-lg">
         <div className="container mx-auto flex items-center justify-between">
           <Link to="/">Notes App</Link> 
           {
            user && (
                <>
                  <div>
                     <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center space-x-4">
                     <span className="text-gray-300 font-medium">Welcome to {user.username}👋</span>
                     <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Logout</button>
                  </div>
                </>
            )
           }
         </div>  
      </nav>
    </div>
  )
}

export default Navbar
