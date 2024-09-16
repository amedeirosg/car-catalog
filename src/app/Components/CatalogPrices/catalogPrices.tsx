import "./CatalogPrices.css";
import Image from "next/image";
import CarTest from "../../../../public/assets/sellVehicle.png";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../ContextProvider/contextProvider";
import { getInfoUser, updateUser } from "@/database/fs";
import { validateRequiredFields } from "@/app/functions";

export default function CatalogPrices() {
  const [err, setErr] = useState({});

  //@ts-ignore
  const { userId } = useContext(InfoContext);

  const [cards, setCards] = useState([
    { name: "", price: "", year: "", km: "", local: "" },
  ]);

  const addCard = () => {
    setCards([...cards, { name: "", price: "", year: "", km: "", local: "" }]);
  };

  const saveChanges = () => {
    const newErrors = {};

    cards.map((card, index) => {
      const requiredFieldsError = validateRequiredFields({
        name: card.name,
        price: card.price,
        year: card.year,
        km: card.km,
        local: card.local,
      });

      //@ts-ignore
      if (requiredFieldsError) newErrors[index] = requiredFieldsError;
    });

    if (Object.keys(newErrors).length > 0) {
      setErr(newErrors);
      return;
    }

    const cardsObject = cards.reduce((acc, card, index) => {
      //@ts-ignore
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

  //@ts-ignore
  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];

    //@ts-ignore
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  useEffect(() => {
    getInfoUser(userId)
      .then((res) => {
        //@ts-ignore
        if (res && res.cards) {
          //@ts-ignore
          const userCards = Object.values(res.cards).map((card) => ({
            //@ts-ignore
            name: card.name,
            //@ts-ignore
            price: card.price,
            //@ts-ignore
            year: card.year,
            //@ts-ignore
            km: card.km,
            //@ts-ignore
            local: card.local,
          }));

          setCards(userCards);
        } else {
          console.error("No cards found or user response is invalid");
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [userId]);

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
                  placeholder="Nome do veículo"
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <div className="CardCarPrice">
                  <input
                    value={card.price}
                    placeholder="Preço"
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                  <p id="ShowInstallments">ver parcelas</p>
                </div>
                <div className="CardYearKm">
                  <input
                    value={card.year}
                    placeholder="Ano"
                    onChange={(e) =>
                      handleInputChange(index, "year", e.target.value)
                    }
                  />
                  <input
                    value={card.km}
                    placeholder="Quilometragem"
                    onChange={(e) =>
                      handleInputChange(index, "km", e.target.value)
                    }
                  />
                </div>
                <hr />
                <div className="CardCarLocal">
                  <input
                    value={card.local}
                    placeholder="Localiadde"
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
