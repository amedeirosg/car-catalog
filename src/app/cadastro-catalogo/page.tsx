"use client";
import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import { CarFrontIcon, ShoppingCart, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { getInfoUser } from "@/database/fs";
import Loading from "../../../public/assets/orange_circles.gif";
import CatalogPrices from "../Components/CatalogPrices/catalogPrices";
import AutoCatalog from "../autocatalog/page";
export default function RegisterCatalog() {
  const [openMenu, setOpenMenu] = useState(false);

  const [selected, setSelected] = useState(false);

  const [visible, setVisible] = useState(false);

  const [loadPrices, setLoadPrices] = useState(false);
  const [loadCatalog, setLoadCatalog] = useState(false);
  //@ts-ignore
  const { userId } = useContext(InfoContext);
  const [nameOfStore, setNameOfStore] = useState(null);

  const navOptions = [
    {
      icon: <CarFrontIcon />,
      title: "Atualizar Catálogo",
    },
    {
      icon: <ShoppingCart />,
      title: "Ver tela de vendas",
    },
  ];

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
    <div style={{ position: "relative" }}>
      <div
        className="RegisterCatalogContainer"
        style={{ filter: `${visible ? "blur(5px)" : ""}` }}
      >
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
            <img
              src={Logo.src}
              width={200}
              height={200}
              alt="Logo da empresa"
            />
            <p>{nameOfStore ? nameOfStore : "Carregando..."}</p>
          </div>
          <div className="RegisterCatalogL">
            <p id="subtitle">Desempenho e Vendas</p>
            <div className="RegisterCatalogSubT">
              {navOptions.map((op, index) => (
                <div
                  key={index}
                  className={`RegisterSubOptMap ${
                    selected === index ? "clicked" : ""
                  }`}
                  onClick={() => {
                    setSelected(index);
                    setVisible(true);
                    setTimeout(() => {
                      if (index === 1) {
                        setLoadCatalog(false);
                        setLoadPrices(true);
                      } else {
                        setLoadCatalog(true);
                        setLoadPrices(false);
                      }

                      setVisible(false);
                    }, 1000);
                  }}
                >
                  {op.icon}
                  <p>{op.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {loadPrices ? <CatalogPrices /> : ""}
        {loadCatalog ? <AutoCatalog displayFilter={false} /> : ""}
      </div>
      <div
        className="RegisterLoadingFields"
        style={{ display: `${visible ? "flex" : "none"}` }}
      >
        <img
          src={Loading.src}
          width={100}
          height={100}
          className="LoadingGif"
        />
      </div>
    </div>
  );
}
