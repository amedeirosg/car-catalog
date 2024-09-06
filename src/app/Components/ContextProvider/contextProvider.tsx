"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

// Definição do contexto
export const InfoContext = createContext({});

export const InfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicialização do estado fora do bloco condicional
  const [infoAcc, setInfoAcc] = useState(() => {
    if (typeof window !== "undefined") {
      const savedInfo = localStorage.getItem("infoAcc");
      return savedInfo ? JSON.parse(savedInfo) : {};
    }
    return {}; // Valor padrão para o lado do servidor
  });


  const [nameOfStore, setNameOfStore] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedInfo = localStorage.getItem('nameOfStore');
      return savedInfo ? savedInfo : null;
    }
    return null; // Ensure this is consistent on both server and client
  });

  // Efeito colateral para salvar `infoAcc` no localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infoAcc", JSON.stringify(infoAcc));
    }
  }, [infoAcc]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nameOfStore", nameOfStore);
    }
  }, [nameOfStore]);

  // Retorno do contexto
  return (
    <InfoContext.Provider value={{ infoAcc, setInfoAcc, nameOfStore, setNameOfStore }}>
      {children}
    </InfoContext.Provider>
  );
};
