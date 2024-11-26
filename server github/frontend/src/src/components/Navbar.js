import { Link } from 'react-router-dom';

const Navbar = () => {

    return(
        <header>
            <div classname = "header">
                <Link to = "/">
                    <h1>Constellations</h1>
                </Link>

            </div>
        </header>
    )

}

export default Navbar