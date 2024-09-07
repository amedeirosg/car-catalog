"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import { CarFrontIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { getInfoUser } from "@/database/fs";
import CatalogPrices from "../Components/CatalogPrices/catalogPrices";
export default function RegisterCatalog() {
  const [loadPrices, setLoadPrices] = useState(false)
  const {userId} = useContext(InfoContext)
  const [nameOfStore, setNameOfStore] = useState(null)

  useEffect(()=>{

     getInfoUser(userId).then((res) => {

      setNameOfStore(res)

    })

  },[userId])


  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <img src={Logo.src} width={200} height={200} alt="Logo da empresa" />
          <p>{nameOfStore ? nameOfStore : "Carregando..."}</p>
        </div>
        <div className="RegisterCatalogL">
          <p id="subtitle">Desempenho e Vendas</p>
          <div className="RegisterCatalogSubT">
            <div className="RegisterCatalogNav" onClick={() => {
              setLoadPrices(true)
            }}>
              <CarFrontIcon />
              <p>Atualizar catálogo</p>
            </div>
          </div>
        </div>
      </div>
      {loadPrices ? <CatalogPrices/> : ''}
    </div>
  );
  
}
