import RegistrationPanel from "./RegistrationPanel"
import { Container, Row, Col } from "react-bootstrap"

function Registration() {
    return (
        <>
            <Container>
                <Row className="justify-content-md-center mb-5 mt-5">
                    <Col md="auto">
                        <h1>The Online Tutorial Pairing System</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-5">
                    <Col md="auto">
                        <RegistrationPanel />
                        <br/><label>Back to </label> <a href="./Login">Login</a>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Registration;