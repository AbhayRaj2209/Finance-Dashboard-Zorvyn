import { createContext, useContext, useState } from "react";
import { roles } from "../data/mockData";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState("Admin");

  return (
    <RoleContext.Provider value={{ role, setRole, roles }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}