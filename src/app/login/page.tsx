"use client";
import { useState } from "react";
import { loginWithEmail } from "@/database/fs";
import { ChevronLeft } from "lucide-react";
import { useHandleBack } from "../Components/HandleBack/handleBack";
import { useHandleNext } from "../Components/HandleNext/handleNext";
import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import "./Login.css";

export default function Login() {
  const [getEmail, setGetEmail] = useState("");
  const [getPass, setGetPass] = useState("");
  const handleBack = useHandleBack();
  const handleNext = useHandleNext({ route: "/cadastro-catalogo" });


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
          <button onClick={() => loginWithEmail(getEmail,getPass).then((res)=>{

            if (res){

              window.location.assign("/cadastro-catalogo");

            }

          })} className="login">
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
