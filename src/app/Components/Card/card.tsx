import "./Card.css";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";

export default function Card() {
  return (
    <div className="CardContainer">
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        <h1>Nome do carro</h1>
        <div className="CardCarPrice">
          <p id="PriceCar">R$ 0,00</p>
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <p>0000</p>
          <p>0km</p>
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <p>Localidade</p>
        </div>
      </div>
    </div>
  );
}
