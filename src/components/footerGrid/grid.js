import {Col, Container, Row} from "react-bootstrap";
import bit from "../../assets/bitcoin-coin.svg"
import eth from "../../assets/ethereum.svg"
import dol from "../../assets/dollar.svg"
import bnb from "../../assets/binance.com.svg"
import euro from "../../assets/euro.svg"
import xrp from "../../assets/xrp.svg"
import "./grid.scss"

const GridFooter = ()=> {
    return(
        <Container style={{
        position:"relative",
        marginTop:"100px"
        }
        }>
            <Row>

                <Col className="col__padding">
                    <div className="grid__border">
                        <img src={bit} alt="bitcoin" className="grid__img"/>
                    </div>
                </Col>
                <Col  className="col__padding">   <div className="grid__border">
                    <img src={eth} alt="bitcoin" className="grid__img"/>
                </div></Col>
                <Col  className="col__padding">   <div className="grid__border">
                        <img src={bnb} alt="bitcoin" className="grid__img"/>
                    </div></Col>
                <div className="line_one" ></div>
            </Row>
            <Row>

                <Col  className="col__padding">
                    <div className="line_two" ></div>
                    <div className="grid__border">
                        <img src={dol} alt="bitcoin" className="grid__img"/>
                    </div></Col>
                <Col  className="col__padding">   <div className="grid__border">
                        <img src={euro} alt="bitcoin" className="grid__img"/>
                    </div></Col>
                <Col  className="col__padding">   <div className="grid__border">
                        <img src={xrp} alt="bitcoin" className="grid__img"/>
                    </div></Col>
                <div className="line_three" ></div>
            </Row>
        </Container>
    )
}
export default GridFooter;