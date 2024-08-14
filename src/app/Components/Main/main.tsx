import "./Main.css";
import Image from "next/image";
import ImageMain from "../../../../public/assets/carMainPage.png";
import Header from "../Header/header";

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
            <button id="btnCadastro">Cadastrar agora</button>
            <button id="btnSobre">Sobre nós</button>
          </div>
        </div>
        <div className="MainImage">
          <Image src={ImageMain} width={630} height={515} alt="car image" />
        </div>
      </div>
    </div>
  );
}
