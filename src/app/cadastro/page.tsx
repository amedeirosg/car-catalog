import RegisterHeader from "../Components/RegisterHeader/registerHeader";
import "./Register.css";

export default function Register() {
  return (
    <div className="RegisterContainer">
      <RegisterHeader />
      <div className="RegisterTitle">
        <div className="RegisterInfo">
          <h1>Crie seu cadastro</h1>
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
        <form className="RegisterForm">
          <div className="RegisterArea">
            <div className="RegisterLines">
              <div className="RegisterInput">
                <span>
                  Nome <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
              <div className="RegisterInput">
                <span>
                  Sobrenome <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
            </div>
            <div className="RegisterLines">
              <div className="RegisterInput">
                <span>
                  CPF <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
              <div className="RegisterInput">
                <span>
                  Telefone <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
            </div>
            <div className="RegisterLines" id="email">
              <div className="RegisterInput">
                <span>
                  Email <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
            </div>
            <div className="RegisterLines">
              <div className="RegisterInput">
                <span>
                  Senha <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
              <div className="RegisterInput">
                <span>
                  Confirmar senha <label id="required">*</label>
                </span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="RegisterCreateAcc">
            <button>Cadastrar</button>
            <div className="RegisterTerms">
              <p>
                Ao preencher o formulário acima você concorda com os nossos{" "}
                <label>Termos de uso</label> e nossa{" "}
                <label>Política de Privacidade</label>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
