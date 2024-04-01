import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/IdeaManager")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Albury POC</h1>
      {data && <p>{data}</p>}
    </div>
  )
}

export default App
