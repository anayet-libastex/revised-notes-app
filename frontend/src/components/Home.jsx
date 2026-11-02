import axios from "axios";
import { useEffect, useState } from "react"
import NoteModal from "./NoteModal";
import { useLocation } from "react-router";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNote, setEditNote]= useState(null);
    const location = useLocation() 

    const fetchNotes = async () => {
        try{
          const token = localStorage.getItem("token");
          if(!token) {
            setError("No authentication token found. Please login");
            return;
          }
          const searchParams = new URLSearchParams(location.search);
          const search = searchParams.get("search") || "";
          const {data} = await axios.get("/api/notes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
          const filteredNotes = search ? data.filter((note) => note.title.toLowerCase().includes(search.toLocaleLowerCase()) || note.description.toLowerCase().includes(search.toLocaleLowerCase())) : data;
          setNotes(filteredNotes);
          // setNotes(data);
        }catch(err) {
           console.error(err.message)
           setError("Failed to fetch notes")
        }
    }

    const handleEdit = (note) => {
        setEditNote(note);
        setIsModalOpen(true)
    }

  useEffect(()=>{
     fetchNotes();
  },[location.search])

  const handleDelete = async(id) => {
     try{
       const token = localStorage.getItem("token");
       if(!token) {
         setError("No authentication token found. Please login")
         return;
       }
       await axios.delete(`/api/notes/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
       })
       setNotes(notes.filter((note) => note._id !== id))
     }catch(err) {
        console.error(err.message);
        setError("Failed to delete note")
     }
  }

  const handleSaveNote = (newNote) => {
    if(editNote) {
        setNotes(notes.map((note) => note._id === newNote._id ? newNote : note))
    }else {
        setNotes([...notes, newNote])
    }
    setEditNote(null);
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-500">
       {error && <p className="text-red-400 mb-4">{error}</p>}
       <div className="pb-8">
          <button onClick={() => setIsModalOpen(true)} className="bg-gray-800 hover:bg-gray-900 px-4 py-2 text-white font-semibold text-md rounded-md flex space-x-1 justify-center items-center">
            <span className="text-white">&#10133;</span> <span>Create New</span>
            </button>
       </div>
       <NoteModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          setEditNote(null);
       }} note={editNote} onSave={handleSaveNote} />
       <button onClick={() => setIsModalOpen(true)} className="fixed bottom-6 right-6 w-13 h-13 bg-gray-800 text-white text-3xl rounded-full shadow-lg hover:bg-gray-900 flex items-ceter justify-center">
         <span className="flex items-center justify-center mb-2 font-bold">+</span>
       </button>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            notes.map((note) => (
                <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-auto h-45" key={note._id}>
                   <h3 className="text-lg font-medium text-white mb-2">{note.title}</h3>
                   <p className="text-gray-300 mb-4">{note.description}</p>
                   <p className="text-sm text-gray-400 mb-4">{new Date(note.updatedAt).toLocaleString()}</p>
                   <div className="flex space-x-2">
                     <button onClick={() => handleEdit(note)} className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700">Edit</button>
                     <button onClick={() => handleDelete(note._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Delete</button>
                   </div>
                </div>
            ))
          }
       </div>
    </div>
  )
}

export default Home
