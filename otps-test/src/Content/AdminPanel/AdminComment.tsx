import { useState } from "react";
import { Card, ListGroup, Button, Modal, Col, Row } from "react-bootstrap"
import axios from "axios";

export interface AdminFeedbackProps {
    id: string;
    comment: string;
    rating: string;
    reportReason: string[];
    specificReason: string;
}

function AdminComment(props: AdminFeedbackProps, onFeedbackChange: () => void) {    
    const [reportId, setReportId] = useState("")
    const HandleRemoveFeedback = async (reportId: string) => {
        // TODO(mario):
        try{
            console.log("remove feedback")

        } catch (error){
            console.log(error);
        }
    }

    const HandleRemoveUser = async (reportId: string) => {
        // TODO(mario)
        try{
            console.log("remove user")

        } catch (error){
            console.log(error);
        }
    }

    const HandleIgnore = async (reportId: string) => {
        try{
            console.log("ignore", reportId);
            const response = await axios.post('http://localhost:3000/api/ignore', {
                id: reportId,
            });
            onFeedbackChange();
        } catch (error){
            console.log(error);
        }
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
                    <Col md="4"><Button variant="danger" onClick={() => {HandleRemoveFeedback(props.id)}}>Remove Feedback</Button></Col>
                    <Col md="4"><Button variant="danger" onClick={() => {HandleRemoveUser(props.id)}}>Remove User</Button></Col>
                    <Col md="4"><Button variant="secondary" onClick={() => {HandleIgnore(props.id)}}>Ignore</Button></Col>
                </Row>
            </Card>
        </>
    );
}

export default AdminComment;