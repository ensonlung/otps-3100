import { Form, Card, ListGroup, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import styles from '../Widget/TutorPost.module.css';

export interface TutorPostProps {
    name: string;
    username: string;
    gender: 'Male' | 'Female';
    subject: string[];
    district: string[];
    availableDays: string[];
    tuitionFee: string;
    contact: string;
}

function TutorPostSelf(props: TutorPostProps) {

    // useStates for report
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showHide, setShowHide] = useState(false)

    const HandleEdit = async () => {
        // TODO
        setShowEdit(false)
    }

    const HandleDelete = async() => {
        // TODO
        setShowDelete(false)
    }

    const HandleHide = async() => {
        // TODO
        setShowHide(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title> {props.name} <span className={styles.username}>@{props.username}</span></Card.Title>
                    <Card.Text> {props.gender} </Card.Text>
                </Card.Body>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: {props.subject.join(', ')} </ListGroup.Item>
                    <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
                    <ListGroup.Item>Contact: {props.contact}</ListGroup.Item>
                </ListGroup>
                <Button variant="danger" onClick={() => setShowDelete(true)}>Delete</Button>
                <Button variant="warning" onClick={() => setShowHide(true)}>Hide</Button>
                <Button variant="secondary" onClick={() => setShowEdit(true)}>Edit</Button>
            </Card>

            <Modal show={showDelete} backdrop="static" onHide={() => {setShowDelete(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowDelete(false)}}>Cancel</Button>
                    <Button variant="danger" onClick={HandleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} backdrop="static" onHide={() => {setShowEdit(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowEdit(false)}}>Cancel</Button>
                    <Button variant="success" onClick={HandleEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showHide} backdrop="static" onHide={() => {setShowHide(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Hide?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowHide(false)}}>Cancel</Button>
                    <Button variant="success" onClick={HandleHide}>Hide</Button>
                </Modal.Footer>
            </Modal>
            <br/>
        </>
    );
}

export default TutorPostSelf;