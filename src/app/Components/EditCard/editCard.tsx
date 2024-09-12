import "./EditCard.css";
import { useContext, useState } from "react";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";
import { InfoContext } from "../ContextProvider/contextProvider";

export default function EditCard({
  name,
  price,
  year,
  km,
  local,
  onInputChange,
}) {
  // const {
  //   nameOfCar,
  //   setNameOfCar,
  //   priceOfCar,
  //   setPriceOfCar,
  //   yearOfCar,
  //   setYearOfCar,
  //   kmOfCar,
  //   setKmOfCar,
  //   localOfCar,
  //   setLocalOfCar,
  // } = useContext(InfoContext);

  return (
    <div className="CardContainer">
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        <input
          value={name}
          onChange={(e) => onInputChange(0, "name", e.target.value)}
        ></input>
        <div className="CardCarPrice">
          <input
            value={price}
            onChange={(e) => onInputChange(0, "price", e.target.value)}
          ></input>
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <input
            value={year}
            onChange={(e) => onInputChange(0, "year", e.target.value)}
          ></input>
          <input
            value={km}
            onChange={(e) => onInputChange(0, "km", e.target.value)}
          ></input>
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <input
            value={local}
            onChange={(e) => onInputChange(0, "local", e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}
