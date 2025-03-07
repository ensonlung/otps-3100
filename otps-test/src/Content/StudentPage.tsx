import { Container, Row, Col } from "react-bootstrap";
import StudentLeftPanel from "./StudentPanels/StudentLeftPanel"
import { useLocation } from "react-router-dom"

function StudentPage() {
    const location = useLocation();
    const {username, password, userType} = location.state || {};
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="3">
                        <StudentLeftPanel username={username} password={password}/>
                    </Col>
                    <Col md="9">
                    Tutors' posts goes here
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentPage;