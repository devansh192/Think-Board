import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage.jsx";
import CreatePage from "./pages/Createpage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-full w-full bg-slate-950">
        <div
          className="absolute bottom-0 left-[-20%] top-[-10%] 
                    h-[500px] w-[500px] rounded-full 
                    bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
        ></div>
        <div
          className="absolute bottom-0 right-[-20%] top-[-10%] 
                    h-[500px] w-[500px] rounded-full 
                    bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
        ></div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
