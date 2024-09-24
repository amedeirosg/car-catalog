"use client";
import { Filter } from "lucide-react";
import Card from "../Components/Card/card";
import Header from "../Components/Header/header";
import { X } from "lucide-react";
import "./AutoCatalog.css";
import { useContext, useEffect, useState } from "react";
import { getInfoUser } from "@/database/fs";
import { InfoContext } from "../Components/ContextProvider/contextProvider";

interface AutoCatalogProps {
  displayFilter: boolean;
}

export default function AutoCatalog({ displayFilter }: AutoCatalogProps) {
  const [openFilter, setOpenFilter] = useState(false);
  //@ts-ignore
  const { userId } = useContext(InfoContext);
  const [cards, setCards] = useState([
    { name: "", price: "", year: "", km: "", local: "" },
  ]);

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

  console.log(displayFilter);

  return (
    <div className="Header">
      <Header displayHeader={displayFilter} />
      <div className={`AutoCatalogArea ${openFilter ? "overlay" : ""}`}>
        <div
          className="AutoCatalogContainer"
          style={{
            display: displayFilter
              ? "undefined"
              : displayFilter === undefined
              ? "undefined"
              : "none",
          }}
        >
          <div className="AutoCatalogFilters">
            <div className="AutoCatalogBrand">
              <span>Marca, modelo e versão</span>
              <input id="Brand" type="text" placeholder="Fiat" />
            </div>
            <hr></hr>
            <div className="AutoCatalogPrice">
              <span>Preço</span>
              <div className="PriceRange">
                <input id="PriceFrom" type="text" placeholder="De R$" />
                <input id="PriceTo" type="text" placeholder="Até R$" />
              </div>
            </div>
            <hr></hr>
            <div className="AutoCatalogYear">
              <span>Ano</span>
              <div className="YearRange">
                <input id="YearFrom" type="text" placeholder="De 2014" />
                <input id="YearTo" type="text" placeholder="Até 2024" />
              </div>
            </div>
            <hr></hr>
            <div className="AutoCatalogKm">
              <span>Quilometragem</span>
              <input id="Km" type="text" placeholder="0 km" />
            </div>
            <hr></hr>
            <div className="AutoCatalog0Km">
              <label className="Okm">
                <span>Apenas 0 Km</span>
                <input id="OkmCheck" type="radio" name="options3" />
              </label>
              <label className="Anyone">
                <span>Qualquer</span>
                <input id="AnyoneCheck" type="radio" name="options3" />
              </label>
            </div>
            <hr></hr>
            <div className="AutoCatalogEngine">
              <span>Motor</span>
              <label className="AutoCatalog1-0">
                <input id="Engine1-0" type="radio" name="options2" />
                <span>1.0</span>
              </label>
              <label className="AutoCatalog1-6">
                <input id="Engine1-6" type="radio" name="options2" />
                <span>1.6</span>
              </label>
              <label className="AutoCatalogAnyone">
                <input id="EngineAny" type="radio" name="options2" />
                <span>Qualquer</span>
              </label>
            </div>
            <hr></hr>
            <div className="AutoCatalogFuel">
              <span>Combustível</span>
              <label className="FuelType">
                <input id="Fuel" type="radio" />
                <span>Flex</span>
              </label>
            </div>
            <hr></hr>
            <div className="AutoCatalogColors">
              <span>Cor</span>
              <label className="AutoCatalogColor">
                <input id="Gray" type="radio" name="options" />
                <span>Cinza</span>
              </label>
              <label className="AutoCatalogColor">
                <input id="Black" type="radio" name="options" />
                <span>Preto</span>
              </label>
              <label className="AutoCatalogColor">
                <input id="Blue" type="radio" name="options" />
                <span>Azul</span>
              </label>
              <label className="AutoCatalogColor">
                <input id="White" type="radio" name="options" />
                <span>Branco</span>
              </label>
              <label className="AutoCatalogColor">
                <input id="AnyColor" type="radio" name="options" />
                <span>Qualquer</span>
              </label>
            </div>
          </div>
        </div>
        <div
          className="AutoCatalogFilterMobile"
          onClick={() => {
            setOpenFilter(true);
          }}
        >
          <span>Filtros</span>
          <Filter />
        </div>
        {openFilter ? (
          <div className="FilterMobile">
            <div className="FilterMobileArea">
              <div className="FilterTitleClose">
                <h1>Filtros</h1>
                <X onClick={() => setOpenFilter(false)} />
              </div>

              <div className="AutoCatalogBrand">
                <span>Marca, modelo e versão</span>
                <input id="Brand" type="text" placeholder="Fiat" />
              </div>
              <hr></hr>
              <div className="AutoCatalogPrice">
                <span>Preço</span>
                <div className="PriceRange">
                  <input id="PriceFrom" type="text" placeholder="De R$" />
                  <input id="PriceTo" type="text" placeholder="Até R$" />
                </div>
              </div>
              <hr></hr>
              <div className="AutoCatalogYear">
                <span>Ano</span>
                <div className="YearRange">
                  <input id="YearFrom" type="text" placeholder="De 2014" />
                  <input id="YearTo" type="text" placeholder="Até 2024" />
                </div>
              </div>
              <hr></hr>
              <div className="AutoCatalogKm">
                <span>Quilometragem</span>
                <input id="Km" type="text" placeholder="0 km" />
              </div>
              <hr></hr>
              <div className="AutoCatalog0Km">
                <label className="Okm">
                  <span>Apenas 0 Km</span>
                  <input id="OkmCheck" type="radio" name="options3" />
                </label>
                <label className="Anyone">
                  <span>Qualquer</span>
                  <input id="AnyoneCheck" type="radio" name="options3" />
                </label>
              </div>
              <hr></hr>
              <div className="AutoCatalogEngine">
                <span>Motor</span>
                <label className="AutoCatalog1-0">
                  <input id="Engine1-0" type="radio" name="options2" />
                  <span>1.0</span>
                </label>
                <label className="AutoCatalog1-6">
                  <input id="Engine1-6" type="radio" name="options2" />
                  <span>1.6</span>
                </label>
                <label className="AutoCatalogAnyone">
                  <input id="EngineAny" type="radio" name="options2" />
                  <span>Qualquer</span>
                </label>
              </div>
              <hr></hr>
              <div className="AutoCatalogFuel">
                <span>Combustível</span>
                <label className="FuelType">
                  <input id="Fuel" type="radio" />
                  <span>Flex</span>
                </label>
              </div>
              <hr></hr>
              <div className="AutoCatalogColors">
                <span>Cor</span>
                <label className="AutoCatalogColor">
                  <input id="Gray" type="radio" name="options" />
                  <span>Cinza</span>
                </label>
                <label className="AutoCatalogColor">
                  <input id="Black" type="radio" name="options" />
                  <span>Preto</span>
                </label>
                <label className="AutoCatalogColor">
                  <input id="Blue" type="radio" name="options" />
                  <span>Azul</span>
                </label>
                <label className="AutoCatalogColor">
                  <input id="White" type="radio" name="options" />
                  <span>Branco</span>
                </label>
                <label className="AutoCatalogColor">
                  <input id="AnyColor" type="radio" name="options" />
                  <span>Qualquer</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="Cards">
          {cards.map((res, index) => (
            <Card
              key={index}
              name={res.name}
              price={res.price}
              year={res.year}
              km={res.km}
              local={res.local}
            />
          ))}

          {/* <Card />
          <Card />
          <Card />
          <Card />
          <Card /> */}
        </div>
      </div>
    </div>
  );
}
