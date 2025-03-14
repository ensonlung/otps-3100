import { Row, Col, Card, Form, Button } from "react-bootstrap"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"
import { useState } from "react"

function RegistrationPanel() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState()
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
                            <Col sm="10"><Form.Control type="date"></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Phone Number:</Form.Label>
                            <Col sm="10">
                                <PhoneInput placeholder="phone number" defaultCountry={"HK"} onChange={setPhoneNumber}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Col sm="10"><Form.Control type="text" placeholder="username"></Form.Control></Col>
                        </Form.Group>
                        <Row>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password"></Form.Control></Col>
                                </Form.Group>
                            </Col>
                            <Col md="5">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Re-enter Password:</Form.Label>
                                    <Col sm="12"><Form.Control type="password" placeholder="password"></Form.Control></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                    </Form>
                    <Button variant="success" onClick={() => console.log(firstName, lastName, email, phoneNumber)}>
                        Register
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default RegistrationPanel;