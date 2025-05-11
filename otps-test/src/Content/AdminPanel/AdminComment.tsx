import { Card, ListGroup, Button, Modal, Col, Row } from "react-bootstrap"

export interface AdminFeedbackProps {
    comment: string;
    rating: string;
    reportReason: string[];
    specificReason: string;
}

function AdminComment(props: AdminFeedbackProps) {
    const HandleRemovePost = async () => {
        // TODO(mario):
        console.log("remove report")
    }

    const HandleRemoveUser = async () => {
        // TODO(mario)
        console.log("remove user")
    }

    const HandleIgnore = async () => {
        // TODO(mario)
        console.log("ignore")
    }
    return (
        <>
            <Card>
                <ListGroup>
                    <ListGroup.Item>Comment: {props.comment}</ListGroup.Item>
                    <ListGroup.Item>Rating: {props.rating}</ListGroup.Item>
                    <ListGroup.Item>Reason: {props.reportReason.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Specific Reason: {props.specificReason}</ListGroup.Item>
                </ListGroup>
                <Row>
                    <Col md="4"><Button variant="danger" onClick={HandleRemovePost}>Remove Post</Button></Col>
                    <Col md="4"><Button variant="danger" onClick={HandleRemoveUser}>Remove User</Button></Col>
                    <Col md="4"><Button variant="secondary" onClick={HandleIgnore}>Ignore</Button></Col>
                </Row>
            </Card>
        </>
    );
}

export default AdminComment;