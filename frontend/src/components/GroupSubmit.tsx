import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/GroupSubmit.css";
import config from "../config";
import { Container, CssBaseline } from "@mui/material";

function GroupSubmit() {
  const [members, setMembers] = useState([
    { name: sessionStorage.getItem("username") || "" },
    { name: "Alex" }
  ]);
  const [groupname, setGroupName] = useState("Let's get hyped");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const memberInputRefs = useRef([] as React.RefObject<HTMLInputElement>[]);
  const usernameRef = useRef(sessionStorage.getItem("username") ?? ""); // Using useRef to store username

  useEffect(() => {
    usernameRef.current = sessionStorage.getItem("username") ?? ""; // Storing username
  }, []);

  useEffect(() => {
    memberInputRefs.current = members.map(() => React.createRef<HTMLInputElement>());
  }, [members]);

  const addMemberRow = () => {
    setMembers([...members, { name: "" }]);
  };

  const handleMemberKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      addMemberRow();
      if ((memberInputRefs.current[index + 1] as React.RefObject<HTMLInputElement>)?.current) {
        (memberInputRefs.current[index + 1] as React.RefObject<HTMLInputElement>)?.current?.focus();
      }
    }
  };

  const handleGroupFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const token = getTokenFromCookie();

    if (!token) {
      setErrorMessage("Token not found. Please log in again.");
      return;
    }

    try {
      const memberNames = members.map(member => member.name);

      await axios.post(
        `${config.backend.url}/group/submit`,
        {
          username: usernameRef.current, // Using useRef to access username
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
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className="group-submit-container">
        <h2>{"Let's make friends"}</h2>
        <p>{`Alex let you borrow money? Or you're just really nice, ${usernameRef.current}! Press tab to enter another member.`}</p>
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
    </Container>
  );
}

export default GroupSubmit;
