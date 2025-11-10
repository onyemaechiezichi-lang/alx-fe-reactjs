import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "320px" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Location:</strong> {user?.location}</p>
    </div>
  );
}

export default UserProfile;
