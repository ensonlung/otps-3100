import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { useLocation, useNavigate } from "react-router-dom"

function Fake() {
    const location = useLocation();
    const navigate = useNavigate();
    const {username, password, userType} = location.state || {};
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        Welcome to the OTPS!
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        Your username is {username}.
                        Your password is {password}.
                        You login as a {userType}.
                    </Col>
                </Row>
                <Button variant="primary" onClick={()=>navigate("/Login")}>Back</Button>
            </Container>
        </>
    );
}

export default Fake;