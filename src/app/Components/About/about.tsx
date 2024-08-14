import "./About.css";

export default function About() {
  return (
    <div className="AboutContainer">
      <h1>Sobre nós</h1>
      <div className="AboutTxt">
        <p>
          Bem-vindo ao <span>AutoCatalog</span>, o seu destino para criar
          catálogos de carros de maneira fácil e eficiente. Nossa plataforma foi
          projetada para permitir que proprietários de lojas de carros criem e
          personalizem seus próprios sites de catálogo, utilizando componentes
          pré-construídos que simplificam todo o processo.
        </p>
        <p>
          Nossa missão é capacitar lojistas a expandirem sua presença online,
          oferecendo uma ferramenta intuitiva e poderosa que elimina a
          complexidade da criação de sites. Com <span>AutoCatalog</span>, você
          pode:
        </p>
        <ul>
          <li>
            <span>Cadastrar sua loja:</span> De forma rápida e sem complicações,
            forneça as informações necessárias e comece a construir seu
            catálogo.
          </li>
          <li>
            <span>Personalizar seu catálogo:</span> Utilize nossos componentes
            prontos para criar um site que reflete a identidade da sua loja e
            destaca seus veículos.
          </li>
          <li>
            <span>Expandir seu alcance:</span>
            Aumente a visibilidade de seus carros e atraia mais clientes com um
            catálogo online atrativo e funcional.
          </li>
        </ul>
      </div>
      <button>Fale Conosco</button>
    </div>
  );
}
