import { Card, ListGroup, Button, Modal, Col, Row } from "react-bootstrap"
import styles from '../Widget/TutorPost.module.css';
import axios from "axios";

export interface AdminPostProps {
    id: string;
    username: string;
    subject: string[];
    district: string[];
    availableDays: string[];
    tuitionFee: string;
    contact: string;
    reportReason: string[];
    specificReason: string;
}

function AdminPost(props: AdminPostProps, onPostChange: () => void) {

    const HandleRemovePost = async (reportId: string) => {
        try{
            console.log("remove post")
            const response = await axios.post('http://localhost:3000/api/remove-post', {
                id: reportId,
            });
            onPostChange();
        } catch (error){
            console.log(error);
        }
    }

    const HandleRemoveUser = async (reportId: string) => {
        try{
            console.log("remove user")
            const response = await axios.post('http://localhost:3000/api/remove-user', {
                id: reportId,
            });
            onPostChange();
        } catch (error){
            console.log(error);
        }
    }

    const HandleIgnore = async (reportId: string) => {
        try{
            console.log("ignore")
            const response = await axios.post('http://localhost:3000/api/ignore', {
                id: reportId,
            });
            onPostChange();
        } catch (error){
            console.log(error);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title> <span className={styles.username}>@{props.username}</span></Card.Title>
                </Card.Body>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: {props.subject.join(', ')} </ListGroup.Item>
                    <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
                    <ListGroup.Item>Contact: {props.contact}</ListGroup.Item>
                    <ListGroup.Item>Reason: {props.reportReason.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Specific Reason: {props.specificReason}</ListGroup.Item>
                </ListGroup>
                <Row>
                    <Col md="4"><Button variant="danger" onClick={() => {HandleRemovePost(props.id)}}>Remove Post</Button></Col>
                    <Col md="4"><Button variant="danger" onClick={() => {HandleRemoveUser(props.id)}}>Remove User</Button></Col>
                    <Col md="4"><Button variant="secondary" onClick={() => {HandleIgnore(props.id)}}>Ignore</Button></Col>
                </Row>
            </Card>
            <br/>
        </>
    );
}

export default AdminPost;