import logo from "../../../assets/horsley3.png";
import twitter from "../../../assets/lendingAssets/twitter.svg";
import youtube from "../../../assets/lendingAssets/youtube.svg";
import insta from "../../../assets/lendingAssets/instagram.svg";
import facebook from "../../../assets/lendingAssets/facebook.svg";
import "./footer.scss";

const Footer = () => {
    return (
        <footer className="footerL__container">
            <div className="footerL__wrapper">
                <div className="footerL__logo">
                    <img src={logo} alt="bitcoin" className="footerL__logo-img"/>
                </div>
                <div className="footerL__navList">
                    <ul className="footerL__navList-container">
                        <li className="footerL__list">currencies</li>
                        <li className="footerL__list">security</li>
                        <li className="footerL__list">asset trading</li>
                        <li className="footerL__list">support</li>
                    </ul>
                    <ul className="footerL__navList-container">
                        <li className="footerL__list">contact us</li>
                        <li className="footerL__list"> about</li>
                        <li className="footerL__list">privacy</li>
                        <li className="footerL__list">faq</li>
                    </ul>


                </div>
                <div className="footerL__social">
                    <h2 className="footerL__social-title">Social:</h2>
                    <ul className="footerL__social-nav">
                        <li className="footerL__social-list"> <a href="#" className="footerL__social-link"><img className="footerL__social-img" src={twitter} alt="#"/></a></li>
                        <li className="footerL__social-list"> <a href="#" className="footerL__social-link"><img className="footerL__social-img" src={youtube} alt="#"/></a></li>
                        <li className="footerL__social-list"> <a href="#" className="footerL__social-link"><img className="footerL__social-img" src={insta} alt="#"/></a></li>
                        <li className="footerL__social-list"> <a href="#" className="footerL__social-link"><img className="footerL__social-img" src={facebook} alt="#"/></a></li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}
export default Footer;