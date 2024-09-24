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

export default function Card({ name, price, year, km, local }: CardProps) {
  return (
    <div className="CardContainer">
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        <h1>{name}</h1>
        <div className="CardCarPrice">
          <p id="PriceCar">R$ {price}</p>
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <p>{year}</p>
          <p>{km}</p>
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <p>{local}</p>
        </div>
      </div>
    </div>
  );
}
