import "./RegisterCatalog.css";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { CarFrontIcon } from "lucide-react";

export default function RegisterCatalog() {
  return (
    <div className="RegisterCatalogContainer">
      <div className="RegisterCatalogLeftMenu">
        <div className="RegisterCatalogTitle">
          <Image src={Logo} alt="Logo da empresa" width={80} height={80} />
          <p>Nome da sua loja</p>
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
