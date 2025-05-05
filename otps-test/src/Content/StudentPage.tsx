import { Container, Row, Col } from "react-bootstrap";
import StudentLeftPanel from "./StudentPanels/StudentLeftPanel"
import StudentPostManager from "./StudentPanels/StudentPostManager"
import { useLocation } from "react-router-dom"

function StudentPage() {
    const location = useLocation();
    const {username, password} = location.state || {};
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="3">
                        <StudentLeftPanel username={username} password={password}/>
                    </Col>
                    <Col md="9">
                        <StudentPostManager />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentPage;