import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/GroupList.css";
import config from "../config";

function GroupList() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") ?? "");
    fetchGroupList();
  }, []);

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  const fetchGroupList = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `${config.backend.url}/group/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: sessionStorage.getItem("username"),
          },
        }
      );

      setGroupList(response.data);
    } catch (error) {
      setErrorMessage("An error occurred while fetching transactions.");
      console.error("Error fetching transactions:", error);
    }
  };

  const calculateHoursSince = (date: string) => {
    return ((Date.now() - Date.parse(date))/3600000).toFixed(2);
  };

  return (
    <div className="group-list-container">
      <h2>Groups List</h2>
      <p>{`You're pretty popular, ${username}.`}</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {groupList.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Buddies since</th>
                <th>{"So that's like"}</th>
              </tr>
            </thead>
            <tbody>
              {groupList.map((group: { groupname: string, members: string[], createdAt: string }, index) => (
                <tr key={index}>
                  <td>{group.groupname}</td>
                  <td>{group.members.join(", ")}</td>
                  <td>{group.createdAt}</td>
                  <td>{String(calculateHoursSince(group.createdAt))+ " hours"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GroupList;
