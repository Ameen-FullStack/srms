import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>
        <h1>MERN Project</h1>
        <p>{message}</p>
      </div>
    </>
  );
}

export default App;
