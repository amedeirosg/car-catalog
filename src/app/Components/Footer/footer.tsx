import "./Footer.css";
import Logo from "../../../../public/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="FooterContainer">
      <div className="FooterRightsReserved">
        <Image src={Logo} width={200} height={200} alt={""} />
        <p>© 2024 AutoCatalog, Inc. Todos os direitos reservados.</p>
      </div>
      <div className="FooterNav">
        <nav>
          <p id="title">Links Rápidos</p>
          <p id="options">Início</p>
          <p id="options">Contato</p>
          <p id="options">Cadastrar</p>
        </nav>
        <nav>
          <p id="title">Conecte com a gente</p>
          <p id="options">Instagram</p>
          <p id="options">Facebook</p>
        </nav>
      </div>
    </div>
  );
}
