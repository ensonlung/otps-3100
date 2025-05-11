import { Form, Card, ListGroup, Button, Modal, Row, Col } from "react-bootstrap"
import Select from "react-select"
import { useState } from "react"
import { subjects, districts, days } from "../../TutorPostInfo.cjs";
import axios from "axios"
import {TutorPostProps} from "../Widget/TutorPost"

function TutorPostSelf(props: TutorPostProps) {

    // useStates for report
    const [postId, setPostId] = useState("")
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showHide, setShowHide] = useState(false)

    const [username, setUserName] = useState<string[]>([])
    const [subject, setSubject] = useState<string[]>([])
    const [district, setDistrict] = useState<string[]>([])
    const [day, setDay] = useState<string[]>([])
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [fee, setFee] = useState("")
    const [selfIntro, setSelfIntro] = useState("")
    const [posts, setPosts] = useState<TutorPostProps[]>([])
    

    const HandleEdit = async () => {
        // TODO
        try { //Fetch-buggy
            const response = await axios.post('http://localhost:3000/api/get-post', {
                tutorName: username,
            });
            const rawPosts: any[] = response.data.posts;

            const formattedPosts: TutorPostProps[] = rawPosts.map((post: any) => ({
                id: post.id,
                time: post.time,
                name: post.name,
                username: post.username,
                gender: post.gender,
                subject: post.subject,
                district: post.district,
                availableDays: post.availableDays,
                tuitionFee: post.tuitionFee,
                contact: post.contact,
                selfIntro: post.selfIntro,
            }));
            formattedPosts.reverse();
            setPosts(formattedPosts);
            } catch (error) {
                console.error('Error fetching initial posts:', error);
                setPosts([]);
            }
        setShowEdit(true)
    }

    const HandleDelete = async() => {
        try {
            const response = await axios.post('http://localhost:3000/api/delete-post', {
                id: postId,
            });
        } catch (error){
            console.error('Error delete posts:', error);
        }
        setShowDelete(false)
    }

    const HandleHide = async() => {
        try {
            const response = await axios.post('http://localhost:3000/api/delete-post', {
                id: postId,
            });
        } catch (error){
            console.error('Error delete posts:', error);
        }
        setShowHide(false)
    }

    return (
        <>
            <Card>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: {props.subject.join(', ')} </ListGroup.Item>
                    <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Available Time: {props.time}</ListGroup.Item>
                    <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
                    <ListGroup.Item>Description: {props.selfIntro}</ListGroup.Item>
                </ListGroup>
                <Row>
                    <Col md="2"><Button variant="danger" onClick={() => {setPostId(props.id), setShowDelete(true)}}>Delete</Button></Col>
                    <Col md="2"><Button variant="primary" onClick={() => {setPostId(props.id), setShowHide(true)}}>Hide</Button></Col>
                    <Col md="2"><Button variant="secondary" onClick={() => {setPostId(props.id), setShowEdit(true)}}>Edit</Button></Col>
                </Row>
                
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
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Select isMulti options={subjects.slice(1)} onChange={(e) => {setSubject(Array.from(e, (subject) => subject.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Select isMulti options={districts.slice(1)} onChange={(e) => {setDistrict(Array.from(e, (district) => district.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Day</Form.Label>
                            <Select isMulti options={days.slice(1)} onChange={(e) => {setDay(Array.from(e, (day) => day.label))}}/>
                        </Form.Group>
                        <Row>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" onChange={(e) => setStartTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>End Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" onChange={(e) => setEndTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Per Hour Tuition Fee (in HKD)</Form.Label>
                            <Form.Control type="int" placeholder="0" onChange={(e) => setFee(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Self Description</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Describe Yourself" onChange={(e) => setSelfIntro(e.target.value)}/>
                        </Form.Group>
                    </Form>
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