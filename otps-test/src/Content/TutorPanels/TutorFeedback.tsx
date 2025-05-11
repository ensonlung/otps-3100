import { Form, Card, ListGroup, Button, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import Select from "react-select"
import { tutorReportReason } from "../../TutorPostInfo.cjs"
import axios from "axios"

interface TutorFeedbackProps {
    username: string,
}

interface Feedback{
    id: string,
    comment: string,
    rating: string,
}


const TutorFeedback: React.FC<TutorFeedbackProps> = ({ username }) => {   
    const [showReport, setShowReport] = useState(false)
    const [reportFeedbackID, setReportFeedbackID] = useState("");
    const [reason, setReason] = useState<string[]>([])
    const [specialReason, setSpecialReason] = useState("")
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

    const HandleReport = async () => {
        if (reason.length == 0) alert("Failed. Please choose a reason.");
        else {
            try{
                const response = await axios.post('http://localhost:3000/api/report', {
                    reportReason: reason,
                    reportSpecialReason: specialReason,
                    target: "Feedback", 
                    id: reportFeedbackID,
                });
                console.log(reportFeedbackID, reason, specialReason);

                setShowReport(false);
                alert("Report received. Thank you!");
            } catch (error){
                setShowReport(false);
                console.error("Error Report");
            }
        }
    }
    useEffect(() => {
            const fetchFeedbacks = async () => {
                try {
                const response = await axios.post('http://localhost:3000/api/get-comment', {
                    tutorName: username,
                });
                const rawFeedbacks: any[] = response.data.feedbacks;

                const formattedFeedbacks: Feedback[] = rawFeedbacks.map((feedback: any) => ({
                    id: feedback.id,
                    comment: feedback.comment,
                    rating: feedback.rating,
                }));
                formattedFeedbacks.reverse();
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
                        <Button variant="danger" onClick={() => {setShowReport(true), setReportFeedbackID(feedback.id)}}>Report</Button>
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