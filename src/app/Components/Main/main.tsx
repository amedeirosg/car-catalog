"use client";
import "./Main.css";
import Image from "next/image";
import ImageMain from "../../../../public/assets/carMainPage.png";
import Header from "../Header/header";
import { useHandleNext } from "../HandleNext/handleNext";
export default function Main() {
  return (
    <div className="Header">
      <Header />
      <div className="MainContainer">
        <div className="MainPresentation">
          <div className="MainTitle">
            <h1>Bem-vindo ao AutoCatalog</h1>
            <p>Facilitando a criação de catálogos para sua loja de carros</p>
          </div>
          <div className="MainBtns">
            <button
              id="btnCadastro"
              onClick={useHandleNext({ route: "/cadastro" })}
            >
              Cadastrar agora
            </button>
            <button id="btnSobre" onClick={useHandleNext({ route: "/login" })}>
              Acessar
            </button>
          </div>
        </div>
        <div className="MainImage">
          <img src={ImageMain.src} width={630} height={515} alt="car image" />
        </div>
      </div>
    </div>
  );
}
