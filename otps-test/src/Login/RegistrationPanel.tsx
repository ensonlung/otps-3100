import { Row, Col, Card, Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationPanel() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [bday, setBday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const HandleRegister = async () => {
        setError('');
        if (password != rePassword) {
            console.log("Two passwords are not the same.");
            setError('Two passwords do not match. Register Failed.');
            return;
        }
        try {
            const checkRegisterUsername = await axios.post('http://localhost:3000/api/check-username', {
                username: userName,
            });
    
            if (checkRegisterUsername.data.exists) {
                setError('Username already taken! Please choose a different username.');
                return;
            }

            const studentInfo = {"id": 1, "last name": lastName, "first name": firstName, "email": email, 
                "bday": bday, "phone number": phoneNumber, "username": userName, "password": password};
            const response = await axios.post("http://localhost:3000/api/students/register", {
                studentInfo: studentInfo,
            });
            
            console.log(response.data);
            alert("Registration Complete. Please login again.");
            navigate("/Login")
        }
        catch (error) {
            setError('Registration failed. Please try again.');
            console.error("Error registration");
        }
    };
    return (
        <>
            <Card style={{width: "32rem"}}>
                <Card.Header>Register</Card.Header>
                <Card.Body>
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
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Col sm="10"><Form.Control type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Row>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Re-enter Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password" onChange={(e) => setRePassword(e.target.value)}></Form.Control></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                    </Form>
                    <Button variant="success" onClick={HandleRegister}>
                        Register
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Card.Body>
            </Card>
        </>
    );
}

export default RegistrationPanel;