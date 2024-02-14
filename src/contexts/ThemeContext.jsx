import { createContext } from 'react';

let ThemeContext = createContext();

let ThemeContextProvider = ({ children }) => {
  return <ThemeContext.Provider value={{ theme: 'dark' }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeContextProvider };
