import { useContext, useState } from "react";
import { InfoContext } from "../ContextProvider/contextProvider";
import EditCard from "../EditCard/editCard";
import "./CatalogPrices.css";
import { updateUser } from "@/database/fs";
import { validateRequiredFields } from "@/app/functions";
export default function CatalogPrices() {
  const [err, setErr] = useState({});

  const { userId } = useContext(InfoContext);

  const [cards, setCards] = useState([]);

  const saveChanges = () => {
    const newErrors = {};

    const requiredFieldsError = validateRequiredFields({
      name: cards[0].name,
      price: cards[0].price,
      year: cards[0].year,
      km: cards[0].km,
      local: cards[0].local,
    });

    if (requiredFieldsError) {
      newErrors.requiredFields = requiredFieldsError;

      setErr(newErrors);
    } else {
      setErr(newErrors);
      cards.map((card, index) => {
        updateUser(
          userId,
          card.name,
          card.price,
          card.year,
          card.km,
          card.local,
          index
        );
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];

    if (updatedCards[index]) {
      updatedCards[index][field] = value;
      setCards(updatedCards);
    } else {
      console.error(`Índice ${index} não existe no array de cards.`);
    }
  };

  const addCard = () => {
    setCards([...cards, { name: "", price: "", year: "", km: "", local: "" }]);
  };

  const deleteCard = () => {
    return "delete";
  };

  return (
    <div className="CatalogPricesContainer">
      <div className="CatalogEditCards">
        {cards.map((card, index) => (
          <div className="EditCardsGrid" key={index}>
            <EditCard
              name={card.name}
              price={card.price}
              year={card.year}
              km={card.km}
              local={card.local}
              onInputChange={handleInputChange}
            />
          </div>
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
