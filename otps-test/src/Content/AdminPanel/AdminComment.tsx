import { Card, ListGroup, Button, Modal, Col, Row } from "react-bootstrap"


function AdminComment() {
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
                    <ListGroup.Item>Comment: It is not very attracting, especially the high price.</ListGroup.Item>
                    <ListGroup.Item>Rating: 2</ListGroup.Item>
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