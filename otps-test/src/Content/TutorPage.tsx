import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TutorLeftPanel from "./TutorPanels/TutorLeftPanel"
import TutorPostForm from "./TutorPanels/TutorPostForm"
import TutorFeedBack from "./TutorPanels/TutorFeedback"
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
                        <TutorPostForm username={username} password={password}/>
                    </Col>
                    <Col className="bg-light" md="3">
                        <h3>Feedback</h3>
                        <TutorFeedBack/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TutorPage;