"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import { CarFrontIcon, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { getInfoUser } from "@/database/fs";
import CatalogPrices from "../Components/CatalogPrices/catalogPrices";
export default function RegisterCatalog() {
  const [openMenu, setOpenMenu] = useState(false);

  const [loadPrices, setLoadPrices] = useState(false);
  //@ts-ignore
  const { userId } = useContext(InfoContext);
  const [nameOfStore, setNameOfStore] = useState(null);

  useEffect(() => {
    getInfoUser(userId).then((res) => {
      try {
        //@ts-ignore
        if (res && res.nameOfStore) {
          //@ts-ignore
          setNameOfStore(res.nameOfStore);
        } else {
          console.error("Nome da loja está indefinido");
        }
      } catch (err) {
        console.error(
          "Erro ao montar página RegisterCatalog - useEffect(() => {getInfoUser(userId)})"
        );
      }
    });
  }, [userId]);

  return (
    <div className="RegisterCatalogContainer">
      <div
        className={`RegisterCatalogMenuMobile ${openMenu ? "open" : ""}`}
        onClick={() => setOpenMenu(true)}
      >
        <div className="RegisterCatalogBurger"></div>
        <div className="RegisterCatalogBurger"></div>
        <div className="RegisterCatalogBurger"></div>
      </div>
      <div
        className={`RegisterCatalogLeftMenu ${
          openMenu ? "mobileMenuOpen" : ""
        }  `}
      >
        <div
          className="RegisterCatalogBurgerClose"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <X style={{ strokeWidth: "0.3rem" }} />
        </div>
        <div className="RegisterCatalogTitle">
          <img src={Logo.src} width={200} height={200} alt="Logo da empresa" />
          <p>{nameOfStore ? nameOfStore : "Carregando..."}</p>
        </div>
        <div className="RegisterCatalogL">
          <p id="subtitle">Desempenho e Vendas</p>
          <div className="RegisterCatalogSubT">
            <div
              className="RegisterCatalogNav"
              onClick={() => {
                setLoadPrices(true);
              }}
            >
              <CarFrontIcon />
              <p>Atualizar catálogo</p>
            </div>
          </div>
        </div>
      </div>
      {loadPrices ? <CatalogPrices /> : ""}
    </div>
  );
}
