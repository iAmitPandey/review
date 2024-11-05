import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [usernames, setUsernames] = useState([]);

  // const GITHUB_TOKEN =

  async function fetchData() {
    if (!input.trim()) return;
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${input}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      const names = res.data.items || [];
      setUsernames(names);
      console.log(names);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsernames([]);
    }
  }
  let newArr = usernames.map((item) => item.login);

  function handleIt(username) {
    setInput(username);
    setUsernames([]);
  }

  useEffect(() => {
    if (input) {
      fetchData();
    }
  }, [input]);

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     if (input) fetchData();
  //   }, 300);

  //   return () => clearTimeout(delayDebounce);
  // }, [input]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Search GitHub users"
      />
      <ul>
        {newArr.map((username, index) => (
          <li
            key={index}
            onMouseEnter={() => setInput(username)}
            onClick={() => {
              handleIt(username);
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
