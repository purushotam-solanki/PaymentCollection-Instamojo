import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ps-3 ">
            <Link to="/" className="navbar-brand">MojoPay</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="invoices" className="nav-link">Invoices</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
