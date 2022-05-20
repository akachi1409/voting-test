import React from "react";
import { Container } from "react-bootstrap";

//import CSS
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer-control'>
                <Container className='footer'>
                    <p>&copy;2022 &nbsp; Akachi</p>
                </Container>
            </div>
        );
    }
}

export default Footer;