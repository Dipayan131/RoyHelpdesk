'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // Initialize value from local storage or set default
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem('myValue');
      return savedValue !== null ? JSON.parse(savedValue) : 'Initial Value';
    }
    return 'Initial Value';
  });

  // Initialize name from local storage or set default
  const [name, setName] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('name');
      return savedName !== null ? JSON.parse(savedName) : 'Default Name';
    }
    return 'Default Name';
  });

  // Initialize userEmail from local storage or set default
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('userEmail');
      return savedEmail !== null ? JSON.parse(savedEmail) : 'example@example.com';
    }
    return 'example@example.com';
  });

  // Save value to local storage when it changes
  useEffect(() => {
    localStorage.setItem('myValue', JSON.stringify(value));
  }, [value]);

  // Save name to local storage when it changes
  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  // Save userEmail to local storage when it changes
  useEffect(() => {
    localStorage.setItem('userEmail', JSON.stringify(userEmail));
  }, [userEmail]);

  return (
    <MyContext.Provider value={{ value, setValue, name, setName, userEmail, setUserEmail }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
