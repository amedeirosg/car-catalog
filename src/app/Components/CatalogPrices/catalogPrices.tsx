import "./CatalogPrices.css";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";
import { useContext, useState } from "react";
import { InfoContext } from "../ContextProvider/contextProvider";
import { updateUser } from "@/database/fs";
import { validateRequiredFields } from "@/app/functions";

export default function CatalogPrices() {
  const [err, setErr] = useState({});

  const { userId } = useContext(InfoContext);

  const [errors, setErrors] = useState(null);

  const [cards, setCards] = useState([
    { name: "", price: "", year: "", km: "", local: "" },
  ]);

  const addCard = () => {
    setCards([...cards, { name: "", price: "", year: "", km: "", local: "" }]);
  };

  const saveChanges = () => {
    const newErrors = {};
    console.log("x");

    cards.map((card, index) => {
      const requiredFieldsError = validateRequiredFields({
        name: card.name,
        price: card.price,
        year: card.year,
        km: card.km,
        local: card.local,
      });

      if (requiredFieldsError) newErrors[index] = requiredFieldsError;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cardsObject = cards.reduce((acc, card, index) => {
      acc[`index${index}`] = card;
      return acc;
    }, {});

    updateUser(userId, { cards: cardsObject })
      .then(() => {
        console.log("Cards salvos com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao salvar os cards:", err);
      });
  };

  const deleteCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    console.log([...cards]);
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  return (
    <div className="CatalogPricesContainer">
      <div className="CatalogEditCards">
        {cards.map((card, index) => (
          <div className="EditCards" key={index}>
            <div className="CardContainer">
              <Image
                src={CarTest}
                alt={"imagem do veículo"}
                width={269}
                height={207}
              />
              <div className="CardCarInfo">
                <input
                  value={card.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <div className="CardCarPrice">
                  <input
                    value={card.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                  <p id="ShowInstallments">ver parcelas</p>
                </div>
                <div className="CardYearKm">
                  <input
                    value={card.year}
                    onChange={(e) =>
                      handleInputChange(index, "year", e.target.value)
                    }
                  />
                  <input
                    value={card.km}
                    onChange={(e) =>
                      handleInputChange(index, "km", e.target.value)
                    }
                  />
                </div>
                <hr />
                <div className="CardCarLocal">
                  <input
                    value={card.local}
                    onChange={(e) =>
                      handleInputChange(index, "local", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <button className="BtnDeleteCard" onClick={() => deleteCard(index)}>
              Deletar
            </button>
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

        {Object.values(err).map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            * {error as string}
          </p>
        ))}
      </div>
    </div>
  );
}
