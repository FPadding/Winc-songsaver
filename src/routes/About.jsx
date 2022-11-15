import { Link } from "react-router-dom"

const About = () =>
    <div>
        <h1>Over dit project</h1>
        <p>
            Voeg nummers toe en klik bovenin de tabel om ide kolom op alfabetische volgorde. Klik een tweede keer voor z-a. Klik een derde keer om weer te sorteren op volgorde van toevoegen.
        </p>
        <p>
            Ik begon een paar maanden geleden met deze opdracht. Zomervakantie, covid en mijn bijbaan hebben het me moeilijk gemaakt om deze opdracht af te maken, maar nu is het eindelijk zo ver. Ik had wel wat meer features toe willen voegen, maar gezien het feit dat deze opdracht al zo veel tijd heeft gekost zie ik daar toch maar van af.
        </p>
        <Link to="/"><button>Terug</button></Link>
        <footer>
            Gemaakt door Frits Padding
        </footer>
    </div>
export default About