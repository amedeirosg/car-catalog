"use client";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { validateRequiredFields, teste } from "../functions";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import "./StoreRegister.css";
import { createUser } from "@/database/fs";

export default function StoreRegister() {
  const { infoAcc, setInfoAcc } = useContext(InfoContext);
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborHood] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [nameOfStore, setNameOfStore] = useState("");
  const [errors, setErrors] = useState({});

  const validateCEP = () => {
    const cepRegex = /^\d{5}-?\d{3}$/;

    if (!cepRegex.test(cep)) {
      return "Digite valor correto para o campo CEP";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const cepError = validateCEP();
    if (cepError) newErrors.cep = cepError;

    const requiredFieldsError = validateRequiredFields({
      cep,
      state,
      city,
      neighborhood,
      address,
      number,
      complement,
      nameOfStore,
    });
    if (requiredFieldsError) newErrors.requiredFields = requiredFieldsError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(infoAcc);
      setInfoAcc({
        ...infoAcc,
        cep,
        state,
        city,
        neighborhood,
        address,
        number,
        complement,
        nameOfStore,
      });
      setTimeout(() => {
        createUser(infoAcc);
      }, 1500);
    }
  };

  return (
    <div className="StoreRegisterContainer">
      <div className="Header">
        <RegisterHeader />
      </div>
      <div className="StoreRegisterTitle">
        <h1>Endereço da loja</h1>
        <p>Preencha as informações de endereço da sua loja</p>
      </div>
      <div className="StoreRegisterArea">
        <div className="StoreName">
          <p>
            Nome da loja (como aparecerá no website){" "}
            <label id="required">*</label>
          </p>
          <input
            type="text"
            value={nameOfStore}
            onChange={(e: any) => setNameOfStore(e.target.value)}
          />
        </div>

        <div className="StoreRegisterCEP">
          <p>
            CEP <label id="required">*</label>
          </p>
          <InputMask
            mask="99999-999"
            alwaysShowMask={true}
            value={cep}
            onChange={(e: any) => setCep(e.target.value)}
          />
        </div>
        <div className="StoreRegisterLocal">
          <div className="StoreRegisterState">
            <p>
              Estado <label id="required">*</label>
            </p>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="StoreRegisterCity">
            <p>
              Cidade <label id="required">*</label>
            </p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="StoreRegisterNeighborhood">
          <p>
            Bairro <label id="required">*</label>
          </p>
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborHood(e.target.value)}
          />
        </div>
        <div className="StoreRegisterAddress">
          <p>
            Endereço <label id="required">*</label>
          </p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="StoreRegisterNumberAndComplement">
          <div className="StoreNumber">
            <p>
              Número <label id="required">*</label>
            </p>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="StoreComplement">
            <p>
              Complemento <label id="required">*</label>
            </p>
            <input
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            {Object.values(errors).map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                * {error as string}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="StoreResgiterSend">
        <button onClick={validateAll}>Continuar</button>
      </div>
    </div>
  );
}
