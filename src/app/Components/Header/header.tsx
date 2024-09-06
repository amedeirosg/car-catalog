"use client";
import "./Header.css";
import Logo from "../../../../public/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { useHandleNext } from "../HandleNext/handleNext";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleNext = useHandleNext({ route: "/login" });

  return (
    <div className="HeaderContainer">
      <div className="HeaderLogo">
        <img src={Logo.src} alt="Logo da empresa" width={80} height={80} />
        <h1>AutoCatalog</h1>
      </div>
      <div className="HeaderNav">
        <button>Início</button>
        <button>Sobre</button>
        <button>Contato</button>
        <button
          id="login"
          onClick={() => {
            handleNext();
          }}
        >
          Entrar
        </button>
      </div>
      {openMenu ? (
        ""
      ) : (
        <div
          className="HeaderBurgerMenu"
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <div className="HeaderBurgerIcon"></div>
          <div className="HeaderBurgerIcon"></div>
          <div className="HeaderBurgerIcon"></div>
        </div>
      )}
      <div className={`HeaderBurgerOpen ${openMenu ? "open" : ""}`}>
        <div
          className="HeaderClose"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <X style={{ strokeWidth: "0.3rem" }} />
        </div>

        <Image src={Logo} alt="Logo da empresa" width={120} height={120} />
        <div className="HeaderBurgerOpt">
          <button>Início</button>
          <button>Sobre</button>
          <button>Contato</button>
        </div>
      </div>
    </div>
  );
}
