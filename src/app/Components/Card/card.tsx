import "./Card.css";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";

interface CardProps {
  name: string;
  price: string;
  year: string;
  km: string;
  local: string;
}

export default function Card(props: CardProps) {
  const { name, price, year, km, local } = props;

  return (
    <div className="CardContainer">
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        <h1>{name ? name : "Nome do carro"}</h1>
        <div className="CardCarPrice">
          <p id="PriceCar">R$ {price ? price : "0,00"}</p>
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <p>{year ? year : "0000"}</p>
          <p>{km ? km : "0"}km</p>
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <p>{local ? local : "Localidade"}</p>
        </div>
      </div>
    </div>
  );
}
