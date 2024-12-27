import { contacts } from "../../constants/contacts";
import './Footer.css'

export default function Footer() {
  return (
    <div className="footerBrochure">
      <p><span>Interested?</span> Contact <strong>{contacts[0].number}</strong> or Email at <strong>{contacts[0].email}</strong> </p>
    </div>
  );
}
