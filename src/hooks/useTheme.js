import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function () {
  let context = useContext(ThemeContext);
  if (context == undefined) {
    new Error('Theme context should only be used inside ThemeContextProvider');
  }
  return context;
}
