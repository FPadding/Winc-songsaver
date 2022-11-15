import { Link } from "react-router-dom"

const About = () =>
    <div>
        <h1>Over dit project</h1>
        <p>
            Voeg nummers toe en klik bovenin de tabel om te sorteren. Klik een tweede keer voor z-a.
        </p>
        <Link to="/"><button>Terug</button></Link>
    </div>
export default About