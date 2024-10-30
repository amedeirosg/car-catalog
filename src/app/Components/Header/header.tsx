"use client";
import "./Header.css";
import Logo from "../../../../public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { useHandleNext } from "../HandleNext/handleNext";

interface HeaderProps {
  displayHeader?: boolean | undefined;
}

//@ts-ignore"
export default function Header({ displayHeader }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleNext = useHandleNext({ route: "/login" });
  const handleHome = useHandleNext({ route: "/" });
  return (
    <div
      className="HeaderContainer"
      style={{ display: displayHeader ? "flex" : "none" }}
    >
      <Link href={"/"} className="LinkStyle">
        <div className="HeaderLogo">
          <img src={Logo.src} alt="Logo da empresa" width={80} height={80} />
          <h1>AutoCatalog</h1>
        </div>
      </Link>

      <div className="HeaderNav">
        <Link href="/" className="LinkStyle">
          <button>Início</button>
        </Link>
        <Link href="#about" className="LinkStyle">
          <button>Sobre</button>
        </Link>
        <Link href="#about" className="LinkStyle">
          <button>Contato</button>
        </Link>
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

        <img src={Logo.src} alt="Logo da empresa" width={120} height={120} />
        <div className="HeaderBurgerOpt">
          <button>Início</button>
          <button>Sobre</button>
          <button>Contato</button>
        </div>
      </div>
    </div>
  );
}
