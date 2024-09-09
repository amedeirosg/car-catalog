"use client";
import { useContext, useEffect, useState } from "react";
import { getInfoUser, loginWithEmail, observerUser } from "@/database/fs";
import { ChevronLeft } from "lucide-react";
import { useHandleBack } from "../Components/HandleBack/handleBack";
import { useHandleNext } from "../Components/HandleNext/handleNext";
import { InfoContext } from "../Components/ContextProvider/contextProvider";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import "./Login.css";

export default function Login() {
  const [getEmail, setGetEmail] = useState("");
  const [getPass, setGetPass] = useState("");
  const { nameOfStore, setNameOfStore } = useContext(InfoContext);
  const handleBack = useHandleBack();
  const handleNext = useHandleNext({ route: "/cadastro-catalogo" });
  const handleCadastro = useHandleNext({ route: "/cadastro" });
  const handleLogin = async () => {
    try {
      const res = await loginWithEmail(getEmail, getPass);

      // if(res){

      //   const userInfo = await getInfoUser()

      //   setNameOfStore(userInfo)

      //   handleNext();

      // }

      handleNext();
    } catch (err) {
      console.error("Erro na função handleLogin() no componente Login:", err);
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
          <button onClick={handleLogin} className="login">
            Entrar
          </button>
        </div>
        <span>Não possui uma conta?</span>
        <span
          id="register"
          onClick={() => {
            handleCadastro();
          }}
        >
          Cadastre-se
        </span>
      </div>
    </div>
  );
}
