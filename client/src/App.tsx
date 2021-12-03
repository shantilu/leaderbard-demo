import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LeaderBoard } from "./components/LeaderBoard";
import "./App.css";

const USER_INFO_URL =
  "https://6113a010cba40600170c1b48.mockapi.io/api/v1/users";

function App() {
  const [preparing, setPreparing] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://127.0.0.1:7071"
  );

  useEffect(() => {
    if (lastMessage) {
      if (usersData.length) {
        const scores = JSON.parse(lastMessage.data);
        const enrichedData = usersData
          .map((item: any, i: number) => ({
            ...item,
            score: scores[i].toFixed(2),
          }))
          .sort((a, b) => b.score - a.score);
        setUsersData(enrichedData);
        if (preparing) {
          setPreparing(false);
        }
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    fetch(USER_INFO_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="darker">
      <div className="container">
        <h2>Biggest Winnder Contest</h2>
        <h3>LeaderBoard</h3>
        <hr />
        <div>
          {usersData && usersData.length && !preparing && (
            <LeaderBoard usersData={usersData} />
          )}
        </div>
      </div>
      <footer className="container">
        <span>connection Status: {connectionStatus}</span>
      </footer>
    </div>
  );
}

export default App;
