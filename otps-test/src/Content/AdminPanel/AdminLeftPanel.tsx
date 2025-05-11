import { Container, Row, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface TutorLeftPanelProp {
    username: string;
    password: string;
}

function AdminLeftPanel({username, password}: TutorLeftPanelProp) {
    const navigate = useNavigate();
    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center mb-2 mt-5">
                    <center><h1>OTPS</h1></center>
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    (Admin Mode)
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            Username: {username} <br/>
                            Password: {password}
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

export default AdminLeftPanel;