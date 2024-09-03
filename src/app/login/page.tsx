"use client";
import { useState } from "react";
import { checkIfAccExists } from "@/database/fs";
import { ChevronLeft } from "lucide-react";
import { useHandleBack } from "../Components/HandleBack/handleBack";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import "./Login.css";

export default function Login() {
  const [getEmail, setGetEmail] = useState("");
  const [getPass, setGetPass] = useState("");
  const handleBack = useHandleBack();
  const handleCheckAcc = async () => {
    try {
      const existsAcc = await checkIfAccExists(getEmail, getPass);

      console.log(existsAcc);
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
    }
  };

  return (
    <div className="LoginContainer">
      <RegisterHeader />
      <div className="LoginAreaTitle">
        <div className="LoginTitle">
          <div className="LoginBack" onClick={handleBack}>
            <ChevronLeft />
            <span>Voltar</span>
          </div>
          <span>Entre na sua conta</span>
        </div>
      </div>
      <hr></hr>

      <div className="LoginFormArea">
        <div className="LoginForm">
          <div className="LoginUser">
            <p>E-mail</p>
            <input type="text" onChange={(e) => setGetEmail(e.target.value)} />
          </div>
          <div className="LoginPassword">
            <p>Senha</p>
            <input
              type="password"
              onChange={(e) => setGetPass(e.target.value)}
            />
          </div>
          <button onClick={handleCheckAcc} className="login">
            Entrar
          </button>
        </div>
        <span>Não possui uma conta?</span>
        <span
          id="register"
          onClick={() => {
            window.location.assign("/cadastro");
          }}
        >
          Cadastre-se
        </span>
      </div>
    </div>
  );
}
