import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [usernames, setUsernames] = useState(["adf", "afafghj"]);

  // const GITHUB_TOKEN =

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${input}`,
        {
          headers: {
            Authorization: `token ${import.meta.VITE_TOKEN}`,
          },
        }
      );
      const names = res.data.items.map((item) => item.login);
      setUsernames(names);
      console.log(names);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const newArr = usernames;
  function handleIt(username) {
    setInput(username);
    setUsernames([]);
    // newArr = [];
  }

  useEffect(() => {
    if (input) {
      fetchData();
    }
  }, [input]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Search GitHub users"
      />
      <ul>
        {usernames.map((username, index) => (
          <li
            key={index}
            onMouseEnter={() => setInput(username)}
            onClick={() => {
              let name = username;
              handleIt(name);
            }}
            style={{ cursor: "pointer" }}
          >
            {username}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
