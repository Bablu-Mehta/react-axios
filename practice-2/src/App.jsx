import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  async function fetchData() {
    const response = await axios("http://localhost:3000/");
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>hiii</h1>
    </>
  );
}

export default App;
