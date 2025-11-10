// src/UserContext.js
import { createContext } from "react";

export const UserContext = createContext({
  name: "John Doe",
  email: "john@example.com",
  location: "New York",
});
