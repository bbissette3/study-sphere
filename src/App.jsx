import "./index.css";
import { Routes, Route } from "react-router-dom";

//component imports
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="bg-blue-950 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
