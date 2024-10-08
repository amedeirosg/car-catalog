"use client";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
//@ts-ignore
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { validateRequiredFields } from "../functions";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { createAcc, createUser } from "@/database/fs";
import "./StoreRegister.css";
import { useHandleNext } from "../Components/HandleNext/handleNext";
import { useHandleBack } from "../Components/HandleBack/handleBack";
import { ChevronLeft } from "lucide-react";

export default function StoreRegister() {
  //@ts-ignore
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
  const handleBack = useHandleBack();

  const validateCEP = () => {
    const cepRegex = /^\d{5}-?\d{3}$/;

    if (!cepRegex.test(cep)) {
      return "Digite valor correto para o campo CEP";
    }
  };

  const handleNext = useHandleNext({ route: "/cadastro-catalogo" });

  const validateAll = () => {
    const newErrors = {};
    const cepError = validateCEP();
    //@ts-ignore
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
    //@ts-ignore
    if (requiredFieldsError) newErrors.requiredFields = requiredFieldsError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(infoAcc);

      const updateInfo = {
        ...infoAcc,
        cep,
        state,
        city,
        neighborhood,
        address,
        number,
        complement,
        nameOfStore,
      };

      setInfoAcc(updateInfo);

      createAcc(infoAcc.mail, infoAcc.password).then((res) => {
        //@ts-ignore
        updateInfo.id = res.uid;

        delete updateInfo.password;

        delete updateInfo.confPass;

        createUser(updateInfo);

        handleNext();
      });
    }
  };

  return (
    <div className="StoreRegisterContainer">
      <div className="Header">
        <RegisterHeader />
      </div>
      <div className="StoreRegisterTitle">
        <div className="StoreFormTitle">
          <div className="Title">
            <h1>Endereço da loja</h1>
            <div className="RegisterIconBack" onClick={handleBack}>
              <ChevronLeft />
              <span>Voltar</span>
            </div>
          </div>

          <p>Preencha as informações de endereço da sua loja</p>
        </div>
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
