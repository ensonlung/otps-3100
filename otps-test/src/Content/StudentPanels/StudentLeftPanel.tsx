import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

export interface StudentLeftPanelProp {
    username: string;
}

function StudentLeftPanel({username}: StudentLeftPanelProp) {
    const navigate = useNavigate();

    // Update useState
    const [showUpdate, setShowUpdate] = useState(false)
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [bday, setBday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')

    // Change pw useState
    const [showPw, setShowPw] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const HandleInfoUpdate = async () => {
        // TODO:
        try {
            const updatedInfo = {"last name": lastName, "first name": firstName, "gender": gender,
                "email": email, "bday": bday, "phone number": phoneNumber};
            const response = await axios.post("http://localhost:3000/api/update-info", {
                username: username,
                updatedInfo: updatedInfo,
            });
            alert("User information updated");
        } catch (error) {
            alert("Failed to update user information");
        }
        setShowUpdate(false);
    }

    const HandlePasswordUpdate = async () => {
        // TODO:
        setShowPw(false);
    }

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center mb-2 mt-5">
                    <center><h1>OTPS</h1></center>
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    (Student Version)
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            Username: {username}
                        </Card.Body>
                        <Button variant="primary" onClick={() => setShowUpdate(true)}>Update Profile</Button>    
                        <Button variant="secondary" onClick={() => setShowPw(true)}>Change Password</Button>
                    </Card>
                </Row>
                <Button variant="success" onClick={() => navigate("/")}>Logout</Button>
            </Container>

            <Modal show={showUpdate} backdrop="static" onHide={() => {setShowUpdate(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile for @{username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>First Name:</Form.Label>
                                    <Col sm="12"><Form.Control type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Col sm="12"><Form.Control type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <div key="inline-radio" className="mb-3">
                            <Form.Label>Gender:</Form.Label>
                            <Col>
                            <Form.Check inline label="Male" name="gender" type={"radio"} defaultChecked onClick={() => setGender("Male")}/>
                            <Form.Check inline label="Female" name="gender" type={"radio"} onClick={() => setGender("Female")}/>
                            </Col>
                        </div>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Col sm="10"><Form.Control type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Birth Date:</Form.Label>
                            <Col sm="10"><Form.Control type="date" onChange={(e) => setBday(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Phone Number:</Form.Label>
                            <Col sm="10"><Form.Control type="phone" placeholder="phone number" onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdate(false)}>Cancel</Button>
                    <Button variant="success" onClick={HandleInfoUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPw} backdrop="static" onHide={() => {setShowPw(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password for @{username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Old Password:</Form.Label>
                            <Col sm="12"><Form.Control type="password" placeholder="password" onChange={(e) => setOldPassword(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Row>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>New Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password" onChange={(e) => setNewPassword(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Re-enter New Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password" onChange={(e) => setRePassword(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPw(false)}>Cancel</Button>
                    <Button variant="success" onClick={HandlePasswordUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StudentLeftPanel;