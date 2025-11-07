const MainContent = () => {
  const contentStyle = {
    padding: "20px",
    backgroundColor: "#e8f0ff",
    borderRadius: "8px",
    marginTop: "20px"
  };

  const textStyle = {
    fontSize: "18px",
    color: "#444"
  };

  return (
    <div style={contentStyle}>
      <p style={textStyle}>Welcome to the main content area!</p>
    </div>
  );
};

export default MainContent;
