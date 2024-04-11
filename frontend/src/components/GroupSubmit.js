import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/GroupSubmit.css";
import config from "../config";

function GroupSubmit() {
  const [members, setMembers] = useState([{ name: "Alex" }]);
  const [groupname, setGroupName] = useState("Let's get hyped");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const memberInputRefs = useRef([]);

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
  }, []);

  useEffect(() => {
    // Initialize ref array for member inputs
    memberInputRefs.current = members.map(() => React.createRef());
  }, [members]);

  const addMemberRow = () => {
    setMembers([...members, { name: "" }]);
  };

  const handleMemberKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      addMemberRow();
      // Check if the ref is initialized and the component is mounted
      if (memberInputRefs.current[index + 1] && memberInputRefs.current[index + 1].current) {
        // Focus on the new member input
        memberInputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleGroupFormSubmit = async (event) => {
    event.preventDefault();

    // Retrieve token from session cookie
    const token = getTokenFromCookie();

    if (!token) {
      setErrorMessage("Token not found. Please log in again.");
      return;
    }

    try {
      // Extract member names from the members state
      const memberNames = members.map(member => member.name);
      
      // Send the data to the backend
      await axios.post(
        `${config.backend.url}/group/submit`,
        {
          username: username,
          groupname: String(groupname),
          members: memberNames
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Group entered successfully!");
    } catch (error) {
      setErrorMessage("An error occurred during entering transactions");
      console.error("An error occurred during entering transactions:", error);
    }
  };

  // Function to retrieve token from session cookie
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

  return (
    <div className="group-submit-container">
      <h2>Enter transactions</h2>
      <p>{`Alex let you borrow money? Or you're just really nice, ${username}`}!</p>
      <form onSubmit={handleGroupFormSubmit}>
        <div className="group-inputs">
          <div className="input-group">
            <label htmlFor="groupname">Group Name:</label>
            <input
              type="text"
              id="groupname"
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="members-container">
            {members.map((member, index) => (
              <div key={index} className="member-input-group">
                <label>{`Member ${index + 1}:`}</label>
                <input
                  type="text"
                  placeholder={`Enter member ${index + 1}`}
                  value={member.name}
                  onChange={(e) => {
                    const newMembers = [...members];
                    newMembers[index].name = e.target.value;
                    setMembers(newMembers);
                  }}
                  onKeyDown={(e) => handleMemberKeyDown(e, index)}
                  ref={memberInputRefs.current[index]}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">{"Let's share!"}</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default GroupSubmit;
