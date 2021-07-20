import "./navbar.scss"
import {Button} from "react-bootstrap";
import user from "../../assets/user.svg"


const NavBar = () => {
    return(
        <div className="navbar__container">
            <div>
                <h2 className="navbar__title">hello dim</h2>
            </div>
            <div className="user-button__container">
                <div className="user__container"><img className="user__img" src={user} alt="#"/></div>
                <div className="navbar__button">
                    <Button className="btn__logout "variant="primary">Logout</Button>
                </div>
            </div>
        </div>
    )
}
export default NavBar;