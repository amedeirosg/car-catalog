"use client";
import { auth } from "@/database/fs";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, ReactNode, useEffect } from "react";

export const InfoContext = createContext({});

export const InfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [km, setKm] = useState<string>("");
  const [local, setLocal] = useState<string>("");

  const [userId, setUserId] = useState<Object>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      }
    });
  }, []);

  const [infoAcc, setInfoAcc] = useState(() => {
    if (typeof window !== "undefined") {
      const savedInfo = localStorage.getItem("infoAcc");
      return savedInfo ? JSON.parse(savedInfo) : {};
    }
    return {};
  });

  const [nameOfStore, setNameOfStore] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const savedInfo = localStorage.getItem("nameOfStore");
      return savedInfo ? savedInfo : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infoAcc", JSON.stringify(infoAcc));
    }
  }, [infoAcc]);

  return (
    <InfoContext.Provider
      value={{
        infoAcc,
        setInfoAcc,
        nameOfStore,
        setNameOfStore,
        userId,
        setUserId,
        name,
        setName,
        price,
        setPrice,
        year,
        setYear,
        km,
        setKm,
        local,
        setLocal,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
