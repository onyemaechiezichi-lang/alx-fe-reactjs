function UserProfile() {
  return (
    // CONTAINER: Includes responsive padding/max-width and hover shadow for interactivity.
    <div className="bg-gray-100 p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg text-center 
                    transition-shadow duration-300 hover:shadow-xl">
      
      {/* IMAGE: Includes responsive sizing (w/h-24 -> w/h-36) and hover scale for interactivity. */}
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-24 h-24 md:w-36 md:h-36 mx-auto object-cover 
                   transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
      
      {/* HEADING: Includes responsive font size (text-lg -> text-xl) and hover color change. */}
      <h1 className="text-lg md:text-xl text-blue-800 my-4 font-semibold 
                   hover:text-blue-500 transition-colors duration-300">
        John Doe
      </h1>
      
      {/* PARAGRAPH: Includes responsive font size (text-sm -> text-base). */}
      <p className="text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
