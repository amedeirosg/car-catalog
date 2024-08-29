"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

export const InfoContext = createContext({});

export const InfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [infoAcc, setInfoAcc] = useState(() => {
    const savedInfo = localStorage.getItem("infoAcc");
    return savedInfo ? JSON.parse(savedInfo) : {};
  });

  useEffect(() => {
    localStorage.setItem("infoAcc", JSON.stringify(infoAcc));
  }, [infoAcc]);

  return (
    <InfoContext.Provider value={{ infoAcc, setInfoAcc }}>
      {children}
    </InfoContext.Provider>
  );
};
