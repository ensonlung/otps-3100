import { Form, Card, ListGroup, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import Select from "react-select"
import { tutorReportReason } from "../../TutorPostInfo.cjs"

function TutorFeedback() {
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
                <ListGroup>
                    <ListGroup.Item>Comment: It is not very attracting, especially the high price.</ListGroup.Item>
                    <ListGroup.Item>Rating: 2</ListGroup.Item>
                </ListGroup>
                <Button variant="danger" onClick={() => setShowReport(true)}>Report</Button>
            </Card>

            <Modal show={showReport} backdrop="static" onHide={() => {setShowReport(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Reason:</Form.Label>
                            <Select isMulti options={tutorReportReason} onChange={(e) => {setReason(Array.from(e, (reason) => reason.label))}}/>
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
        </>
    );
}

export default TutorFeedback;