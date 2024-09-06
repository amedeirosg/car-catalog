"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { CarFrontIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getInfoUser } from "@/database/fs";
export default function RegisterCatalog() {
  const [nameOfStore,setNameOfStore] = useState(null)

  useEffect(()=>{

    const fetchUserInfo = async () => {

      try{

        const userInfo = await getInfoUser()
        
        setNameOfStore(userInfo)

      } catch(err){

        console.error("Erro ao retornar nome da loja:", err)

      }

    }

    fetchUserInfo()

  },[nameOfStore])

  
  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <img src={Logo.src} width={200} height={200} alt="Logo da empresa" />
          <p>{nameOfStore ? nameOfStore : 'null'}</p>
        </div>
        <div className="RegisterCatalogL">
          <p id="subtitle">Desempenho e Vendas</p>
          <div className="RegisterCatalogSubT">
            <div className="RegisterCatalogNav">
              <CarFrontIcon />
              <p>Atualizar catalogo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
