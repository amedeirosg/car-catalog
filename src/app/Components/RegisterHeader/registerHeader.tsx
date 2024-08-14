import "./RegisterHeader.css";
import Image from "next/image";
import Logo from "../../../../public/assets/logo.png";
export default function RegisterHeader() {
  return (
    <div className="RegisterHeaderContainer">
      <Image src={Logo} alt="Logo da empresa" width={80} height={80} />
      <h1>AutoCatalog</h1>
    </div>
  );
}
