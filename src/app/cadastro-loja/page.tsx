"use client";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import InputMask from "react-input-mask";
import { useState } from "react";
import { validateRequiredFields, teste } from "../functions";
import "./StoreRegister.css";

export default function StoreRegister() {
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborHood] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
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
    });
    if (requiredFieldsError) newErrors.requiredFields = requiredFieldsError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return "OK";
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
