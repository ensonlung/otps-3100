import { Container, Row, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export interface StudentLeftPanelProp {
    username: string;
}

function StudentLeftPanel({username}: StudentLeftPanelProp) {
    const navigate = useNavigate();
    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center mb-2 mt-5">
                    <center><h1>OTPS</h1></center>
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    (Student Version)
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            Username: {username}
                        </Card.Body>
                    </Card>
                </Row>
                <Button variant="success" onClick={() => navigate("/")}>
                    Logout
                </Button>                
            </Container>
        </>
    );
}

export default StudentLeftPanel;