import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesnotFound from "../components/NotesnotFound.jsx";



const Homepage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");

        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length===0 && !isRateLimited &&<NotesnotFound/>}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
