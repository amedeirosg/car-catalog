"use client";
import { useEffect, useRef, useState } from "react";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import { createUser } from "../../database/fs";
import InputMask from "react-input-mask";
import { ChevronLeft } from "lucide-react";
import "./Register.css";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [errors, setErrors] = useState({});
  const regexMail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    if (!regexMail.test(mail)) {
      return "E-mail inválido";
    }
  };

  const validatePassword = () => {
    if (password !== confPass) {
      return "Senhas não coincidem";
    }
  };

  const validateRequiredFields = () => {
    const requiredFields = { name, lastName, cpf, mail, phone, password };
    for (let [key, value] of Object.entries(requiredFields)) {
      if (value.trim() === "") {
        return `O campo ${key} é obrigatório.`;
      }
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const emailError = validateEmail();
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword();
    if (passwordError) newErrors.password = passwordError;

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) newErrors.requiredFields = requiredFieldsError;

    setErrors(newErrors);

    // if there are no errors, create the account
    if (Object.keys(newErrors).length === 0) {
      createUser(name, lastName, cpf, mail, phone, password);
    }
  };

  return (
    <div className="RegisterContainer">
      <RegisterHeader />
      <div className="RegisterTitle">
        <div className="RegisterInfo">
          <div className="RegisterBack">
            <div className="RegisterIconBack">
              <Link
                href="/"
                style={{ all: "unset", display: "flex", alignItems: "center" }}
              >
                <ChevronLeft />
                <span>Voltar</span>
              </Link>
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
            <input type="radio" name="options" />
            <span>Pessoa física</span>
          </label>
          <label className="RegisterLegalPerson">
            <input type="radio" name="options" />
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
              <div className="RegisterInput">
                <span>
                  CPF <label id="required">*</label>
                </span>
                <InputMask
                  mask="999.999.999-99"
                  alwaysShowMask={true}
                  value={cpf}
                  onChange={(e: any) => setCpf(e.target.value)}
                />
              </div>
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
