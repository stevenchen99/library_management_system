import { createContext } from 'react';

let AuthContext = createContext();

let AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={{ user: 'steven' }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
