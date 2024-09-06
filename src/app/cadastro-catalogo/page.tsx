"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { CarFrontIcon } from "lucide-react";
import { useEffect, useState } from "react";
export default function RegisterCatalog() {
  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <img src={Logo.src} alt="Logo da empresa" />
          <p>Null</p>
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
