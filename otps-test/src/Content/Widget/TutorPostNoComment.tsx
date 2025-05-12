import { Form, Card, ListGroup, Button, Modal, Dropdown } from "react-bootstrap"
import { useState } from "react"
import Select from "react-select"
import { reportReason } from "../../TutorPostInfo.cjs"
import styles from './TutorPost.module.css';
import axios from "axios";
import { TutorPostProps } from "./TutorPost";


function TutorPostNoComment(props: TutorPostProps) {

    // useStates for report
    const [showReport, setShowReport] = useState(false)
    const [reason, setReason] = useState<string[]>([])
    const [specialReason, setSpecialReason] = useState("")
    const [reportPostID, setReportPostID] = useState("")

    const HandleReport = async () => {
        if (reason.length == 0) alert("Failed. Please choose a reason.");
        else {
            try {
                console.log(reason, specialReason);
                const response = await axios.post('http://localhost:3000/api/report', {
                    reportReason: reason,
                    reportSpecialReason: specialReason,
                    target: "Post", 
                    id: reportPostID,
                });
                setShowReport(false);
                alert("Report received. Thank you!");
            } catch (error){
    
                setShowReport(false);
                console.error("Error Report");
            }
        }
    }

    return (
        <>
            <Card>
                <div className="d-flex justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        style={{ textDecoration: 'none', color: '#000', fontSize: '1.5rem', padding: '0' }}
                        >
                        ⋮
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setShowReport(true); setReportPostID(props.id); }}>
                            Report
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: {props.subject.join(', ')} </ListGroup.Item>
                    <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Available Time: {props.time}</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
                    <ListGroup.Item>Contact: {props.contact}</ListGroup.Item>
                    <ListGroup.Item>Description: {props.selfIntro}</ListGroup.Item>
                </ListGroup>
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