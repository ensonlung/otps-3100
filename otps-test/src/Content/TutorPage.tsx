import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TutorLeftPanel from "./TutorPanels/TutorLeftPanel"
import TutorPostForm from "./TutorPanels/TutorPostForm"
import { useLocation } from "react-router-dom"

function TutorPage() {
    const location = useLocation();
    const {username, password} = location.state || {};
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="3">
                        <TutorLeftPanel username={username} password={password}/>
                    </Col>
                    <Col md="6">
                        <TutorPostForm/>
                    </Col>
                    <Col className="bg-light" md="3">
                        Students' comments go here
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TutorPage;