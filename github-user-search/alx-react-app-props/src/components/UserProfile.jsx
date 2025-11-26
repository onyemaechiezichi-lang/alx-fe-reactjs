const UserProfile = () => {
  return (
    <div
      style={{
        border: "2px solid blue",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        marginTop: "20px"
      }}
    >
      <img
        src="https://via.placeholder.com/120"
        alt="User Avatar"
        style={{ borderRadius: "50%", marginBottom: "10px" }}
      />
      <h2 style={{ color: "blue" }}>John Doe</h2>
      <span style={{ color: "gray", fontStyle: "italic" }}>
        React Developer
      </span>
    </div>
  );
};

export default UserProfile;
