import { useState } from "react";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Counter from "./components/Counter";

function App() {
  const [activeTask, setActiveTask] = useState("task0");

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={() => setActiveTask("task0")}>Show Task 0</button>
        <button onClick={() => setActiveTask("task1")}>Show Task 1</button>
      </div>

      {activeTask === "task0" ? (
        <div>
          <Header />
          <UserProfile
            name="Jane Doe"
            age={25}
            bio="Frontend developer and travel enthusiast."
          />
          <MainContent />
          <Footer />
        </div>
      ) : (
        <Counter />
      )}
    </div>
  );
}

export default App;
