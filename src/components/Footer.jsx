import "../styles/Footer.css";
import DigitalCollegeBranco from "../assets/digital-college-branco.png";
import GtLogo from "../assets/gt-logo.png";
import LogoIel2 from "../assets/logo-iel2.png";
import AdeceBranco from "../assets/adece-branco.png";
import LogoGovernoBranco from "../assets/logo-governo-branco.png";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          <p className="footer-title">Nossos apoiadores</p>
          <div className="sponsors">
            <img src={DigitalCollegeBranco} alt="Digital College" />
            <img src={GtLogo} alt="Geração Tech" />
            <img src={LogoIel2} alt="IEL" />
            <img src={AdeceBranco} alt="ADECE" />
            <img src={LogoGovernoBranco} alt="Governo do Ceará" />
          </div>
        </div>
      </footer>
    </>
  );
}