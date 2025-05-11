import { Card, ListGroup, Button, Modal, Col, Row } from "react-bootstrap"
import { useState } from "react"
import styles from '../Widget/TutorPost.module.css';

export interface AdminPostProps {
    name: string;
    username: string;
    gender: 'Male' | 'Female';
    subject: string[];
    district: string[];
    availableDays: string[];
    tuitionFee: string;
    contact: string;
    reportReason: string[];
    specificReason: string;
}

function AdminPost(props: AdminPostProps) {
    const HandleRemovePost = async () => {
        // TODO(mario):
        console.log("remove post")
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
                    <ListGroup.Item>Reason: {props.reportReason.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Specific Reason: {props.specificReason}</ListGroup.Item>
                </ListGroup>
                <Row>
                    <Col md="3"><Button variant="danger" onClick={HandleRemovePost}>Remove Post</Button></Col>
                    <Col md="3"><Button variant="danger" onClick={HandleRemoveUser}>Remove User</Button></Col>
                    <Col md="3"><Button variant="secondary" onClick={HandleIgnore}>Ignore</Button></Col>
                </Row>
            </Card>
            <br/>
        </>
    );
}

export default AdminPost;