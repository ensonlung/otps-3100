import LoginPanel from "./LoginPanel";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const HandleSignIn = (username: string, password: string, userType: string) => {
        navigate(userType === "Student" ? "/Content/StudentPage" : "/Content/TutorPage", { state: {username, password}, replace: true});
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
                        <br/><label>If you don't have an account:</label> <a href="./Registration">Sign-up</a>
                        <br/><label>Admin Account:</label> <a href="./Content/AdminPage">here</a>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;