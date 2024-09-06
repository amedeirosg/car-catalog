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

  // Efeito colateral para salvar `infoAcc` no localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infoAcc", JSON.stringify(infoAcc));
    }
  }, [infoAcc]);

  // Retorno do contexto
  return (
    <InfoContext.Provider value={{ infoAcc, setInfoAcc }}>
      {children}
    </InfoContext.Provider>
  );
};
