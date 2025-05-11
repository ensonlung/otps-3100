import { Form, Card, ListGroup, Button, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import Select from "react-select"
import { tutorReportReason } from "../../TutorPostInfo.cjs"
import axios from "axios"

interface TutorFeedbackProps {
    username: string,
}

interface Feedback{
    comment: string,
    rating: string,
}


const TutorFeedback: React.FC<TutorFeedbackProps> = ({ username }) => {   
    const [showReport, setShowReport] = useState(false)
    const [reason, setReason] = useState<string[]>([])
    const [specialReason, setSpecialReason] = useState("")
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

    const HandleReport = () => {
        // TODO(mario):
        if (reason.length == 0) alert("Failed. Please choose a reason.");
        else {
            console.log(reason, specialReason);
            setShowReport(false);
            alert("Report received. Thank you!");
        }
    }
    useEffect(() => {
            const fetchFeedbacks = async () => {
                try {
                const response = await axios.post('http://localhost:3000/api/get-comment', {
                    tutorName: username,
                });
                const rawFeedbacks: any[] = response.data.feedbacks;
                console.log("HO ", rawFeedbacks);
                const formattedFeedbacks: Feedback[] = rawFeedbacks.map((feedback: any) => ({
                    comment: feedback.comment,
                    rating: feedback.rating,
                }));
                console.log(formattedFeedbacks.length);
                setFeedbacks(formattedFeedbacks);
                } catch (error) {
                    console.error('Error fetching initial posts:', error);
                    setFeedbacks([]);
                }
            };
            fetchFeedbacks();
        }, []);

    return (
        <>
            {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                    <Card key = {index} className="mb-3">
                        <ListGroup>
                            <ListGroup.Item>Comment: {feedback.comment}</ListGroup.Item>
                            <ListGroup.Item>Rating: {feedback.rating}</ListGroup.Item>
                        </ListGroup>
                        <Button variant="danger" onClick={() => setShowReport(true)}>Report</Button>
                    </Card>
                ))
                ) : (
                    <Card className="mb-3">
                    <Card.Body>No feedback available.</Card.Body>
                    </Card>                       
                )}
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