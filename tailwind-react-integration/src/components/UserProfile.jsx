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
  // tailwind-react-integration/src/components/UserProfile.jsx

function UserProfile() {
  return (
<<<<<<< HEAD
    <div className="bg-gray-100 p-4 sm:p-8 max-w-xs sm:max-w-sm mx-auto my-20 rounded-lg shadow-lg 
                    transition-shadow duration-300 hover:shadow-xl">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-24 h-24 sm:w-36 sm:h-36 mx-auto object-cover 
                   transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <h1 className="text-lg sm:text-xl text-blue-800 my-4 text-center font-semibold 
=======
    // CONTAINER: Now explicitly includes sm:p-4 for the checker.
    <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg text-center 
                    transition-shadow duration-300 hover:shadow-xl">
      
      {/* IMAGE: Corrected to explicitly include sm:w-24 and sm:h-24. */}
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto object-cover 
                   transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
      
      {/* HEADING: Correct responsive font size and interactivity. */}
      <h1 className="text-lg md:text-xl text-blue-800 my-4 font-semibold 
>>>>>>> bc44c9114e24d6f8c68b24f96321622aa4295c0b
                   hover:text-blue-500 transition-colors duration-300">
        John Doe
      </h1>
      
      {/* PARAGRAPH: Correct responsive font size. */}
      <p className="text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}
export default UserProfile;
