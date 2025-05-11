import { Form, Card, ListGroup, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import Select from "react-select"
import { reportReason } from "../../TutorPostInfo.cjs"
import styles from './TutorPost.module.css';

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

function TutorPostNoComment(props: TutorPostProps) {

    // useStates for report
    const [showReport, setShowReport] = useState(false)
    const [reason, setReason] = useState<string[]>([])
    const [specialReason, setSpecialReason] = useState("")

    const HandleReport = () => {
        // TODO(mario):
        if (reason.length == 0) alert("Failed. Please choose a reason.");
        else {
            console.log(reason, specialReason);
            setShowReport(false);
            alert("Report received. Thank you!");
        }
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
                <Button variant="danger" onClick={() => setShowReport(true)}>Report</Button>
            </Card>

            <Modal show={showReport} backdrop="static" onHide={() => {setShowReport(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Reason:</Form.Label>
                            <Select isMulti options={reportReason} onChange={(e) => {setReason(Array.from(e, (reason) => reason.label))}}/>
                            <br/>
                            <Form.Control as="textarea" placeholder="Specify reasons if needed" onChange={(e) => setSpecialReason(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowReport(false)}}>Cancel</Button>
                    <Button variant="danger" onClick={HandleReport}>Report</Button>
                </Modal.Footer>
            </Modal>
            <br/>
        </>
    );
}

export default TutorPostNoComment;