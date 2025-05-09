import { Row, Col, Modal, Button, Form } from "react-bootstrap"
import { useState } from "react"
import { subjects, districts, days } from "../../TutorPostInfo.cjs"

function TutorPostForm() {
    // useStates
    const [showModal, setShowModal] = useState(false)

    // new post useStates
    const [subject, setSubject] = useState("Chinese")
    const [district, setDistrict] = useState("Island")
    const [day, setDay] = useState("Monday")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [fee, setFee] = useState("0")
    const [selfIntro, setSelfIntro] = useState("")

    // Handle Create Psot
    const HandleCreatePost = async() => {
        // TODO(Mario)
        console.log(subject, district, day, startTime, endTime, fee, selfIntro);
        setShowModal(false);
    }

    return (
        <>
            <h3>My Posts</h3>
            <Button variant="success" onClick={() => {setShowModal(true)}}>Create Post</Button>
            <Modal show={showModal} backdrop="static" onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Select onChange={(e) => setSubject(e.target.value)}>
                                {
                                    subjects.slice(1).map((subject, index) => (<option key={index}>{subject}</option>))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Form.Select onChange={(e) => setDistrict(e.target.value)}>
                                {
                                    districts.slice(1).map((district, index) => (<option key={index}>{district}</option>))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Day</Form.Label>
                            <Form.Select onChange={(e) => setDay(e.target.value)}>
                                {
                                    days.slice(1).map((day, index) => (<option key={index}>{day}</option>))
                                }
                            </Form.Select>
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
                    <Button variant="secondary" onClick={() => {setShowModal(false)}}>Cancel</Button>
                    <Button variant="success" onClick={HandleCreatePost}>Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TutorPostForm;