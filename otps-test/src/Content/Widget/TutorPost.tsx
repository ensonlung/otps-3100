import { Form, Card, ListGroup } from "react-bootstrap"

interface TutorPostProp {
    // TODO
}

function TutorPost() {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Peter Chan</Card.Title>
                    <Card.Text>Male, Hong Kong</Card.Text>
                </Card.Body>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: English</ListGroup.Item>
                    <ListGroup.Item>Available Days: Thursday, Saturday</ListGroup.Item>
                    <ListGroup.Item>District: Shatin</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: 300/hr</ListGroup.Item>
                    <ListGroup.Item>Email: smartpeter@gmail.com</ListGroup.Item>
                    <ListGroup.Item>Contact: 9999-9999</ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    );
}

export default TutorPost;