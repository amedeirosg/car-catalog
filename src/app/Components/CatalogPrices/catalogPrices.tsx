import { useContext, useState } from "react";
import { InfoContext } from "../ContextProvider/contextProvider";
import EditCard from "../EditCard/editCard";
import "./CatalogPrices.css";
import { updateUser } from "@/database/fs";
export default function CatalogPrices() {
  const { name, price, year, km, local, userId } = useContext(InfoContext);

  const [card, setCard] = useState([]);
  const addCard = () => {
    setCard([...card, card.length + 1]);
  };

  const saveChanges = () => {

    updateUser(userId,name,price,year,km,local)

  };

  return (
    <div className="CatalogPricesContainer">
      <div className="CatalogEditCards">
        {card.map((card, index) => (
          <EditCard key={index} />
        ))}
      </div>
      <div className="CatalogPricesBtns">
        <button className="BtnAddCar" onClick={addCard}>
          Adicionar Carro
        </button>
        <button className="BtnSaveChanges" onClick={saveChanges}>
          Salvar
        </button>
      </div>
    </div>
  );
}
