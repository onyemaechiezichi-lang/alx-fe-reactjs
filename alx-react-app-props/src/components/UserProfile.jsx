import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div style={{ border: "1px solid blue", padding: "12px", borderRadius: "6px" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user && user.name}</p>
      <p><strong>Email:</strong> {user && user.email}</p>
      <p><strong>Location:</strong> {user && user.location}</p>
    </div>
  );
}

export default UserProfile;
