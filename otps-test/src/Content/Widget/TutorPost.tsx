import { Form, Card, ListGroup, Row, Col, Button, Modal } from "react-bootstrap";
import styles from './TutorPost.module.css';

export interface TutorPostProps {
  id: string;
  name: string;
  username: string;
  gender: 'Male' | 'Female';
  subject: string[];
  district: string[];
  availableDays: string[];
  time: string,
  tuitionFee: string;
  contact: string;
  selfIntro: string;
}

function TutorPost(props: TutorPostProps, onComment: (username: string) => void) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {props.name} <span className={styles.username}>@{props.username}</span>
        </Card.Title>
        <Card.Text>{props.gender}</Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>Subject Offered: {props.subject.join(', ')}</ListGroup.Item>
        <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
        <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
        <ListGroup.Item>Avaliable Time: {props.time}</ListGroup.Item>
        <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
        <ListGroup.Item>Contact: {props.contact}</ListGroup.Item>
        <ListGroup.Item>Description: {props.selfIntro}</ListGroup.Item>
      </ListGroup>
      <Button variant="secondary" onClick={() => onComment(props.username)}>
        Check out more about {props.name}
      </Button>
      <Form>
        <Form.Group>
          <Row></Row>
        </Form.Group>
      </Form>
    </Card>
  );
}

export default TutorPost;