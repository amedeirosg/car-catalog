import { useContext, useState } from "react";
import { InfoContext } from "../ContextProvider/contextProvider";
import EditCard from "../EditCard/editCard";
import "./CatalogPrices.css";
import { updateUser } from "@/database/fs";
import { validateRequiredFields } from "@/app/functions";
export default function CatalogPrices() {
  const { name, price, year, km, local, userId } = useContext(InfoContext);
  const [err, setErr] = useState({});
  const [card, setCard] = useState([]);
  const addCard = () => {
    setCard([...card, card.length + 1]);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const saveChanges = () => {
    const newErrors = {};
    const requiredFieldsError = validateRequiredFields({
      name,
      price,
      year,
      km,
      local,
    });

    if (requiredFieldsError) {
      newErrors.requiredFields = requiredFieldsError;
      setErr(newErrors);
    } else {
      updateUser(userId, name, price, year, km, local);
    }
    setErr(newErrors);
  };

  const handleSelectDiv = (index: any) => {
    setSelectedIndex(index);
  };

  const deleteCard = () => {
    if (selectedIndex !== null) {
      const updatedCards = card.filter((_, index) => index !== selectedIndex);
      setCard(updatedCards);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="CatalogPricesContainer">
      <div className="CatalogEditCards">
        {card.map((_, index) => (
          <EditCard
            onClick={() => {
              handleSelectDiv(index);
            }}
            key={index}
            selected={selectedIndex === index}
          />
        ))}
      </div>
      <div className="CatalogPricesBtns">
        <button className="BtnAddCar" onClick={addCard}>
          Adicionar Carro
        </button>
        <button className="BtnSaveChanges" onClick={saveChanges}>
          Salvar
        </button>
        <button className="BtnDeleteCard" onClick={deleteCard}>
          Deletar
        </button>
        {Object.values(err).map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            * {error as string}
          </p>
        ))}
      </div>
    </div>
  );
}
