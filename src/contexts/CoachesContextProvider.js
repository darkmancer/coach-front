import { createContext, useState } from "react";

export const CoachesContext = createContext();

function CoachesContextProvider({ children }) {
  const [coaches, setCoaches] = useState(null);

  return (
    <CoachesContext.Provider value={{ coaches, setCoaches }}>
      {children}
    </CoachesContext.Provider>
  );
}

export default CoachesContextProvider;
