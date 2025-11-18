import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const changeLocation = () => {
    setUser({ ...user, location: "Los Angeles" });
  };

  return (
    <div style={{ border: "1px solid blue", padding: "12px", borderRadius: "6px" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <button onClick={changeLocation} style={{ marginTop: "8px" }}>
        Move to Los Angeles
      </button>
    </div>
  );
}

export default UserProfile;