import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { useLocation, useNavigate } from "react-router-dom"

function Fake() {
    const location = useLocation();
    const navigate = useNavigate();
    const {username, password} = location.state || {};
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
                    </Col>
                </Row>
                <Button variant="primary" onClick={()=>navigate("/Login")}>Back</Button>
            </Container>
        </>
    );
}

export default Fake;