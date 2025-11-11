import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "320px" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>

      <h3>Update Info</h3>
      <input
        type="text"
        name="name"
        placeholder="Update name"
        value={user.name}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="email"
        placeholder="Update email"
        value={user.email}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="location"
        placeholder="Update location"
        value={user.location}
        onChange={handleChange}
      />
    </div>
  );
}

export default UserProfile;
