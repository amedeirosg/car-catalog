"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { CarFrontIcon } from "lucide-react";
import { getNameOfStore } from "@/database/fs";
import { useEffect, useState } from "react";
export default function RegisterCatalog() {
  const [storeName, setStoreName] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreName = async () => {
      const name = await getNameOfStore("medeiirosdev@gmail.com");
      setStoreName(name);
    };
    fetchStoreName();
  }, []);

  useEffect(() => {
    console.log("O estado storeName foi atualizado para:", storeName);
  }, [storeName]);

  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <Image src={Logo} alt="Logo da empresa" width={80} height={80} />
          <p>{storeName ? storeName : "null"}</p>
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
