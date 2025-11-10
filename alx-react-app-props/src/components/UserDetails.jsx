import { useContext } from "react";
import UserContext from "../UserContext";

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div style={{ padding: "20px", border: "1px solid gray", borderRadius: "8px", width: "250px" }}>
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
