"use client";
import "./Register.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useHandleBack } from "../Components/HandleBack/handleBack";
import { useHandleNext } from "../Components/HandleNext/handleNext";
import { validateRequiredFields } from "../../app/functions";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import { createAcc } from "@/database/fs";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
//@ts-ignore
import InputMask from "react-input-mask";

export default function Register() {
  //@ts-ignore
  const { infoAcc, setInfoAcc } = useContext(InfoContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [errors, setErrors] = useState({});
  const regexMail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const [selectedOption, setSelectedOption] = useState("natural");
  const handleBack = useHandleBack();

  const validateEmail = () => {
    if (!regexMail.test(mail)) {
      return "E-mail inválido";
    }
  };

  const validatePassword = (password: any) => {
    const minLength = 8;
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < minLength) {
      return "A senha deve ter pelo menos 8 caracteres";
    }

    if (!regex.test(password)) {
      return "A senha deve incluir letras maiúsculas, minúsculas, números e caracteres especiais";
    }
    if (password !== confPass) {
      return "Senhas não coincidem";
    }
  };

  // const validateRequiredFields = () => {
  //   const requiredFields = { name, lastName, cpfCnpj, mail, phone, password };
  //   for (let [key, value] of Object.entries(requiredFields)) {
  //     if (value.trim() === "") {
  //       return `O campo ${key} é obrigatório.`;
  //     }
  //   }
  // };

  const validateAll = () => {
    const newErrors = {};
    const emailError = validateEmail();
    //@ts-ignore
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    //@ts-ignore
    if (passwordError) newErrors.password = passwordError;

    const requiredFieldsError = validateRequiredFields({
      name,
      lastName,
      cpfCnpj,
      mail,
      phone,
      password,
    });
    //@ts-ignore
    if (requiredFieldsError) newErrors.requiredFields = requiredFieldsError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        createAcc(mail, password).then((res) => {
          setInfoAcc({
            name,
            lastName,
            cpfCnpj,
            mail,
            phone,
            password,
            confPass,
            id: res.uid,
          });
        });

        window.location.assign("/cadastro-loja");
      } catch (err) {
        console.error("Erro na função validateAll() na tela de cadastro:", err);
      }
    }
  };

  return (
    <div className="RegisterContainer">
      <RegisterHeader />
      <div className="RegisterTitle">
        <div className="RegisterInfo">
          <div className="RegisterBack">
            <div className="RegisterIconBack" onClick={handleBack}>
              <ChevronLeft />
              <span>Voltar</span>
            </div>

            <h1>Crie seu cadastro</h1>
          </div>

          <hr></hr>
          <p>
            Para criar o seu site e personalizá-lo é necessário preencher
            corretamente o formulário abaixo com os respectivos dados
            cadastrais. Os campos com * são de preenchimento obrigatório e
            essenciais para realizarmos o envio de informações necessárias.
          </p>
        </div>

        <div className="RegisterRadioBtn">
          <label className="RegisterNaturalPerson">
            <input
              type="radio"
              name="options"
              value="natural"
              checked={selectedOption === "natural"}
              onChange={() => setSelectedOption("natural")}
            />
            <span>Pessoa física</span>
          </label>
          <label className="RegisterLegalPerson">
            <input
              type="radio"
              name="options"
              value="legal"
              checked={selectedOption === "legal"}
              onChange={() => setSelectedOption("legal")}
            />
            <span>Pessoa jurídica</span>
          </label>
        </div>
        <div className="RegisterForm">
          <div className="RegisterArea">
            <div className="RegisterLines">
              <div className="RegisterInput">
                <span>
                  Nome <label id="required">*</label>
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="RegisterInput">
                <span>
                  Sobrenome <label id="required">*</label>
                </span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="RegisterLines">
              {selectedOption === "natural" ? (
                <div className="RegisterInput">
                  <span>
                    CPF <label id="required">*</label>
                  </span>
                  <InputMask
                    mask="999.999.999-99"
                    alwaysShowMask={true}
                    value={cpfCnpj}
                    onChange={(e: any) => setCpfCnpj(e.target.value)}
                  />
                </div>
              ) : (
                <div className="RegisterInput">
                  <div className="RegisterInput">
                    <span>
                      CNPJ <label id="required">*</label>
                    </span>
                    <InputMask
                      mask="99.999.999/9999-99"
                      alwaysShowMask={true}
                      value={cpfCnpj}
                      onChange={(e: any) => setCpfCnpj(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="RegisterInput">
                <span>
                  Telefone <label id="required">*</label>
                </span>
                <InputMask
                  mask="(99) 99999-9999"
                  alwaysShowMask={true}
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="RegisterLines" id="email">
              <div className="RegisterInput">
                <span>
                  Email <label id="required">*</label>
                </span>
                <input
                  type="text"
                  value={mail}
                  onChange={(e: any) => {
                    setMail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="RegisterLines">
              <div className="RegisterInput">
                <span>
                  Senha <label id="required">*</label>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="RegisterInput">
                <span>
                  Confirmar senha <label id="required">*</label>
                </span>
                <input
                  type="password"
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                />
                {/* Exibição dos erros */}

                {Object.values(errors).map((error, index) => (
                  <p key={index} style={{ color: "red" }}>
                    * {error as string}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="RegisterCreateAcc">
            <button onClick={validateAll}>Cadastrar</button>
            <div className="RegisterTerms">
              <p>
                Ao preencher o formulário acima você concorda com os nossos{" "}
                <label>Termos de uso</label> e nossa{" "}
                <label>Política de Privacidade</label>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
