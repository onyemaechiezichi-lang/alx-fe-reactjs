const UserProfile = () => {
  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f2f2f2",
    borderRadius: "8px",
    marginTop: "20px",
    textAlign: "center"
  };

  const imageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px"
  };

  const nameStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333"
  };

  return (
    <div style={containerStyle}>
      <img
        style={imageStyle}
        src="https://via.placeholder.com/120"
        alt="User avatar"
      />
      <h2 style={nameStyle}>John Doe</h2>
    </div>
  );
};

export default UserProfile;
