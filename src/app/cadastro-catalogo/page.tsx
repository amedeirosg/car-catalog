"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { CarFrontIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { getInfoUser } from "@/database/fs";
export default function RegisterCatalog() {

  const {nameOfStore, setNameOfStore} = useContext(InfoContext)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const loadNameOfStore = async () => {
      try {
        const userInfo = await getInfoUser();
        setNameOfStore(userInfo);
      } catch (err) {
        console.error('Erro na função loadNameOfStore() no componente cadastro-loja:', err);
        setNameOfStore(null);
      } finally {
        setLoading(false);
      }
    };

    loadNameOfStore(); // Chamada correta da função assíncrona
  }, [setNameOfStore]); // Dependência adicionada

  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <img src={Logo.src} width={200} height={200} alt="Logo da empresa" />
          <p>{loading ? "Carregando..." : nameOfStore || "Nome da Loja"}</p>
        </div>
        <div className="RegisterCatalogL">
          <p id="subtitle">Desempenho e Vendas</p>
          <div className="RegisterCatalogSubT">
            <div className="RegisterCatalogNav">
              <CarFrontIcon />
              <p>Atualizar catálogo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
