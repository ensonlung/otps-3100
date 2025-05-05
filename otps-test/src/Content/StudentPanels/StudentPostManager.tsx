import { Container, Row, Col } from "react-bootstrap";
import TutorPost from "../Widget/TutorPost"

function StudentPostManager() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <TutorPost />
                    </Col>
                    <Col className="bg-light" md="4">
                        Search bars go here
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentPostManager;