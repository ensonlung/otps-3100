import { Form, Card, ListGroup, Button, Modal, Row, Col, Dropdown } from "react-bootstrap"
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
    const [isHide, setIsHide] = useState("");

    const [username, setUserName] = useState<string[]>([])
    const [subject, setSubject] = useState<string[]>([])
    const [district, setDistrict] = useState<string[]>([])
    const [day, setDay] = useState<string[]>([])
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [fee, setFee] = useState("")
    const [selfIntro, setSelfIntro] = useState("")
    
    const HandleShowEdit = async (pid: string) => {
        try {
          const response = await axios.post('http://localhost:3000/api/get-post', {
            id: pid,
          });
          const post = response.data.post;
          console.log(post);
    
          // Set all form fields with the fetched data
          setSubject(post.subject || []);
          setDistrict(post.district || []);
          setDay(post.day || []);
          setStartTime(post.startTime || "");
          setEndTime(post.endTime || "");
          setFee(post.fee || "");
          setSelfIntro(post.selfIntro || "");
    
        } catch (error) {
          console.error('Error fetching post for editing:', error);
          alert('Failed to load post data for editing.');
        }
      };
    const HandleEdit = async () => {
        try { 
            const response = await axios.post('http://localhost:3000/api/update-post', {
                id: postId,
                subject: subject,
                district: district,
                day: day,
                startTime: startTime,
                endTime: endTime,
                fee: fee,
                selfIntro: selfIntro,
            });
        } catch (error) {
            console.error('Error fetching initial posts:', error);
        }
        setShowEdit(false);
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
            const response = await axios.post('http://localhost:3000/api/hide-post', {
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
                <div className="d-flex justify-content-end">
                    <Dropdown>
                    <Dropdown.Toggle
                        variant="link"
                        style={{ textDecoration: 'none', color: '#000', fontSize: '1.5rem', padding: '0' }}
                    >
                        ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                        onClick={() => {
                            setPostId(props.id);
                            setShowDelete(true);
                        }}
                        >
                        Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                        onClick={() => {
                            setPostId(props.id);
                            setIsHide(props.isHide);
                            setShowHide(true);
                        }}
                        >
                        {props.isHide.toString() == "false" ? "Hide" : "Show"}
                        </Dropdown.Item>
                        <Dropdown.Item
                        onClick={() => {
                            setPostId(props.id);
                            setShowEdit(true);
                            HandleShowEdit(props.id);
                        }}
                        >
                        Edit
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                <ListGroup>
                    <ListGroup.Item>Subject Offered: {props.subject.join(', ')} </ListGroup.Item>
                    <ListGroup.Item>Available Days: {props.availableDays.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Available Time: {props.time}</ListGroup.Item>
                    <ListGroup.Item>District: {props.district.join(', ')}</ListGroup.Item>
                    <ListGroup.Item>Tuition Fee: {props.tuitionFee}</ListGroup.Item>
                    <ListGroup.Item>Description: {props.selfIntro}</ListGroup.Item>
                </ListGroup>
                {/* <Row>
                    <Col md="2"><Button variant="danger" onClick={() => {setPostId(props.id), setShowDelete(true)}}>Delete</Button></Col>
                    <Col md="2"><Button variant="primary" onClick={() => {setPostId(props.id),  setIsHide(props.isHide), setShowHide(true)}}>{props.isHide.toString() == "false" ? "Hide" : "Show"}</Button></Col>
                    <Col md="2"><Button variant="secondary" onClick={() => {setPostId(props.id), setShowEdit(true), HandleShowEdit()}}>Edit</Button></Col>
                </Row> */}
                
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
                            <Select isMulti options={subjects.slice(1)} value={subjects.slice(1).filter(option => subject.includes(option.label))} onChange={(e) => {setSubject(Array.from(e, (subject) => subject.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Select isMulti options={districts.slice(1)} value={districts.slice(1).filter(option => district.includes(option.label))} onChange={(e) => {setDistrict(Array.from(e, (district) => district.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Day</Form.Label>
                            <Select isMulti options={days.slice(1)} value={days.slice(1).filter(option => day.includes(option.label))} onChange={(e) => {setDay(Array.from(e, (day) => day.label))}}/>
                        </Form.Group>
                        <Row>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>End Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Per Hour Tuition Fee (in HKD)</Form.Label>
                            <Form.Control type="int" value={fee} onChange={(e) => setFee(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Self Description</Form.Label>
                            <Form.Control as="textarea" rows={4} value={selfIntro} onChange={(e) => setSelfIntro(e.target.value)}/>
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
                    <Modal.Title>Confirm {isHide.toString() == "false" ? "Hide" : "Show"}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowHide(false)}}>Cancel</Button>
                    <Button variant="success" onClick={HandleHide}>{isHide.toString() == "false" ? "Hide" : "Show"}</Button>
                </Modal.Footer>
            </Modal>
            <br/>
        </>
    );
}

export default TutorPostSelf;