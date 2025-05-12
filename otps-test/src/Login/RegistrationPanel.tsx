import { Row, Col, Card, Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationPanel() {
    const minLength = 8;
    const [userType, setUserType] = useState('Student');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('Male'); //Preset Male
    const [email, setEmail] = useState('');
    const [bday, setBday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [license, setLicense] = useState('')
    const [allLicense, setAllLicense] = useState<string[]>([])
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const NewDay = new Date("01-01-2020");
    const OldDay = new Date("01-01-1900");
    const Bday = new Date(bday);

    const HandleRegister = async () => { //add validation check
        setError('');
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("Invalid email");
            setError('Invalid email. Register Failed.');
            return;
        }
        else if (bday=="" || Bday>=NewDay || Bday<=OldDay) {
            console.log("Invalid Birth Day");
            setError('Invalid birth date. Register Failed.');
            return;
        }
        else if (phoneNumber.length!=8){
            console.log("Invalid Phone Number");
            setError('Invalid Phone Number. Register Failed.');
            return;
        }
        else if (userName.length<5){ //newly added
             console.log("User name is too short");
            setError('User name is too short. Register Failed.');
            return;
        }
        else if (password != rePassword) {
            console.log("Two passwords are not the same.");
            setError('Two passwords do not match. Register Failed.');
            return;
        }
        else if (password.length < minLength){
            console.log("Password too short.");
            setError('Password should at least '+ minLength +' digit. Register Failed.');
            return;
        }
        else if (!/^[0-9]{8}$/.test(phoneNumber)){
            console.log("Invalid Phone Number");
            setError('Invalid Phone Number. Register Failed.');
            return;
        }
        else if (!/[a-z]/.test(password)){
            console.log("Password must contain at least one lowercase letter.");
            setError('Password must contain at least one lowercase letter. Register Failed.');
            return;
        }
        else if (!/[!@#$%^&*()))_+~=-{}|":';<>.,/?]/.test(password)){
            console.log("Password must contain at least one special character.");
            setError('Password must contain at least one special character. Register Failed.');
            return;
        }
        else if (!/[0-9]/.test(password)){
            console.log("Password must contain at least one digit.");
            setError('Password must contain at least one digit. Register Failed.');
            return;
        }
        else if (password.includes(userName)){ //fixed
            console.log("Password cannot contain username.");
            setError('Password cannot contain username. Register Failed.');
            return;
        }
        else if (lastName.length==0 ||firstName.length==0) { 
                console.log("Please fill in all data");
                setError('Please fill in all data. Register Failed.');
                return;
        }
        try {
            if (userType == "Tutor") {
                const checkLicense = await axios.post('http://localhost:3000/api/license-check', { 
                    license: license,
                });
                if (!checkLicense.data.exists) {
                    setError('Please enter a correct license key.');
                    return;
                }
            }
            const checkRegisterUsername = await axios.post('http://localhost:3000/api/verify-username', {
                username: userName,
            });
    
            if (checkRegisterUsername.data.exists) {
                setError('Username already taken! Please choose a different username.');
                return;
            }
            const userInfo = {"user type": userType, "last name": lastName, "first name": firstName, "gender": gender,
                "email": email, "bday": bday, "phone number": phoneNumber, "username": userName, "password": password};
            const response = await axios.post("http://localhost:3000/api/register", {
                userInfo: userInfo,
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
                        <div key="inline-radio" className="mb-3">
                            <Form.Check inline label="Student" name="type" type={"radio"} defaultChecked onClick={() => setUserType("Student")}/>
                            <Form.Check inline label="Tutor" name="type" type={"radio"} onClick={() => setUserType("Tutor")}/>
                        </div>
                        </Row>
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
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>License Key (only for tutor account):</Form.Label>
                            <Col sm="10"><Form.Control type="text" placeholder="license key" onChange={(e) => setLicense(e.target.value)}></Form.Control></Col>
                        </Form.Group>
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