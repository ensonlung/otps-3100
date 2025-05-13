import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

export interface StudentLeftPanelProp {
    username: string;
}

function StudentLeftPanel({username}: StudentLeftPanelProp) {
    const navigate = useNavigate();
    const minLength = 8;
    // Update useState
    const [error, setError] = useState('')
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
    const HandleShowInfo = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/get-info", {
                username: username,
            });
            const post = response.data.account;
            console.log(post);
            setFirstName(post["first name"]);
            setLastName(post["last name"]);
            setGender(post.gender);
            setEmail(post.email);
            setBday(post.bday);
            setPhoneNumber(post["phone number"]);
        } catch (error) {
            alert("Failed to get user information");
        }
    }
    const NewDay = new Date("01-01-2020");
    const OldDay = new Date("01-01-1900");
    const Bday = new Date(bday);
    const HandleInfoUpdate = async () => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){ // check email
            console.log("Invalid email");
            alert('Invalid email. Register Failed.');
            return;
        }
        else if (bday=="" || Bday>=NewDay || Bday<=OldDay) { // check bday
            console.log("Invalid Birth Day");
            alert('Invalid birth date. Register Failed.');
            return;
        }
        else if (!/^[0-9]{8}$/.test(phoneNumber) || /[!@#$%^&*()))_+~=-{}|":';<>.,/?]/.test(phoneNumber)){ // check phone number
            console.log("Invalid Phone Number");
            alert('Invalid Phone Number. Register Failed.');
            return;
        }
        else if (username.length<5){ // check username length
             console.log("User name is too short");
            alert('User name is too short. Register Failed.');
            return;
        }
        else if (lastName.length==0 || firstName.length==0) {  // check name length
                console.log("Please fill in all data");
                alert("Please fill in all data. Register Failed.");
                return;
        }
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
        const response = await axios.post("http://localhost:3000/api/get-password", {
            username: username,
        });
        setError('');
        const realOldPassword = response.data.password;
        if (realOldPassword != oldPassword){ // check password
            console.log("Old password is wrong.");
            setError('Old password is wrong.');
            return;
        } else if (newPassword != rePassword) { // check new password
            console.log("Two passwords are not the same.");
            setError('Two passwords do not match.');
            return;
        }
        else if (newPassword.length < minLength){ // password validations
            console.log("Password too short.");
            setError('Password should at least 8 digit.');
            return;
        }
        else if (!/[A-Z]/.test(newPassword)){
            console.log("Password must contain at least one uppercase letter.");
            setError('Password must contain at least one uppercase letter.');
            return;
        }
        else if (!/[a-z]/.test(newPassword)){
            console.log("Password must contain at least one lowercase letter.");
            setError('Password must contain at least one lowercase letter.');
            return;
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)){
            console.log("Password must contain at least one special character.");
            setError('Password must contain at least one special character.');
            return;
        }
        else if (!/[0-9]/.test(newPassword)){
            console.log("Password must contain at least one digit.");
            setError('Password must contain at least one digit.');
            return;
        }
        else if (newPassword.includes(username)){
            console.log("Password cannot contain username.");
            setError('Password cannot contain username.');
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/update-password", {
                username: username,
                newPw: newPassword,
            });
            alert("User information updated");
        } catch (error) {
            alert("Failed to update user information");
        }
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
                        <Button variant="primary" onClick={() => {HandleShowInfo() ,setShowUpdate(true)}}>Update Profile</Button>    
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
                                    <Col sm="12"><Form.Control type="text" value = {firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Col sm="12"><Form.Control type="text" value = {lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <div key="inline-radio" className="mb-3">
                            <Form.Label>Gender:</Form.Label>
                            <Col>
                            <Form.Check inline label="Male" name="gender" type={"radio"} checked={gender==="Male"} onClick={() => setGender("Male")}/>
                            <Form.Check inline label="Female" name="gender" type={"radio"} checked={gender==="Female"} onClick={() => setGender("Female")}/>
                            </Col>
                        </div>
                        </Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Col sm="10"><Form.Control type="email" value = {email} onChange={(e) => setEmail(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Birth Date:</Form.Label>
                            <Col sm="10"><Form.Control type="date" value = {bday} onChange={(e) => setBday(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Phone Number:</Form.Label>
                            <Col sm="10"><Form.Control type="phone" value = {phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control></Col>
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
                        {error && <p style={{ color: 'red' }}>{error}</p>}
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