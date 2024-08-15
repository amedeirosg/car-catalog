import "./Card.css";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";
export default function Card() {
  return (
    <div className="CardContainer">
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        <h1>Jeep Renegade T720 1.3 Tb 4x2 Flex Aut.</h1>
        <div className="CardCarPrice">
          <p id="PriceCar">R$ 135.100</p>
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <p>2024</p>
          <p>27.740km</p>
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <p>Belo Horizonte, Minas Gerais</p>
        </div>
      </div>
    </div>
  );
}
