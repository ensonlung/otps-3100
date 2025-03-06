import LoginPanel from "./LoginPanel";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const HandleSignIn = (username: string, password: string) => {
        navigate("/Content/Fake", { state: {username, password}, replace: true});
    };
    return (
        <>
            <Container>
                <Row className="justify-content-md-center mb-5 mt-5">
                    <Col md="auto">
                        <h1>The Online Tutorial Pairing System</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <LoginPanel onSignIn={HandleSignIn} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;