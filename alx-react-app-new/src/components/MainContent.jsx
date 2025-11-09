// src/components/MainContent.jsx
import React from "react";

function MainContent() {
  return (
    <main
      style={{
        backgroundColor: "#f0f8ff",
        padding: "20px",
        textAlign: "center",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize: "18px", color: "black" }}>
        I love to visit New York, Paris, and Tokyo.
      </p>
    </main>
  );
}

export default MainContent;
