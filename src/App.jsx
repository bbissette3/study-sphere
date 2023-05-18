import "./index.css";
import { Routes, Route } from "react-router-dom";

//component imports
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-blue-950 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
