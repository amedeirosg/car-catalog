"use client";
import { useState } from "react";
import { checkIfMailExists } from "@/database/fs";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import "./Login.css";

export default function Login() {
  const [getEmail, setGetEmail] = useState("");
  const [getPass, setGetPass] = useState("");

  const handleCheckAcc = async () => {
    try {
      const exists = await checkIfMailExists(getEmail);
      console.log(exists);
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
    }
  };

  return (
    <div className="LoginContainer">
      <RegisterHeader />
      <div className="LoginTitle">
        <span>Entre na sua conta</span>
      </div>

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
        <span id="register">Cadastre-se</span>
      </div>
    </div>
  );
}
