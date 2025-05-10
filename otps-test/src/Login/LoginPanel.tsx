import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useState } from "react"
import axios from "axios";

interface LoginPanelProp {
    onSignIn: (username: string, password: string, userType: string) => void;
}

function LoginPanel({onSignIn}: LoginPanelProp) {
    const [userType, setUserType] = useState("Student")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    
    const HandleLogin = async () => {
        setError('');
        try {
            const checkLogin = await axios.post('http://localhost:3000/api/verify-login', {
                username: username,
                password: password,
                userType: userType,
            });
            if (!checkLogin.data.success){
                setError('Username or Password is wrong.');
                return;
            }
            onSignIn(username, password, userType);
        }
        catch (error) {
            setError('Login failed. Please try again.');
            console.error("Error Login");
        }
    };
    return(
        <>
            <Card style={{width: "32rem"}}>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form>
                        <div key="inline-radio" className="mb-3">
                            <Form.Check inline label="Student" name="user" type={"radio"} defaultChecked onClick={() => setUserType("Student")}/>
                            <Form.Check inline label="Tutor" name="user" type={"radio"} onClick={() => setUserType("Tutor")}/>
                        </div>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Col sm="10"><Form.Control type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Col sm="10"><Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                    </Form>
                    <Button variant="success" onClick={HandleLogin}>
                        Login
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Card.Body>
            </Card>
        </>
    );
}

export default LoginPanel;