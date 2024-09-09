import "./EditCard.css";
import { useContext, useState } from "react";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";
import { InfoContext } from "../ContextProvider/contextProvider";

export default function Card({ onClick, selected }) {
  const {
    name,
    setName,
    price,
    setPrice,
    year,
    setYear,
    km,
    setKm,
    local,
    setLocal,
  } = useContext(InfoContext);

  return (
    <div
      className="CardContainer"
      onClick={onClick}
      style={{
        border: selected ? "1px solid red" : "none",
        cursor: "pointer",
      }}
    >
      <Image src={CarTest} alt={"imagem do veículo"} width={269} height={207} />
      <div className="CardCarInfo">
        {/* Inputs para editar os valores */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do carro"
        />
        <div className="CardCarPrice">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />
          <p id="ShowInstallments">ver parcelas</p>
        </div>
        <div className="CardYearKm">
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ano"
          />
          <input
            type="text"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            placeholder="Quilometragem"
          />
        </div>
        <hr></hr>
        <div className="CardCarLocal">
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Localidade"
          />
        </div>
      </div>
    </div>
  );
}
