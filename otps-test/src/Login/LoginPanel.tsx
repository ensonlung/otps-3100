import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState } from "react"

interface LoginPanelProp {
    onSignIn: (username: string, password: string) => void;
}

function LoginPanel({onSignIn}: LoginPanelProp) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return(
        <>
            <Card style={{width: "32rem"}}>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Col sm="10"><Form.Control type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Col sm="10"><Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></Form.Control></Col>
                        </Form.Group>
                    </Form>
                    <Button variant="success" onClick={() => onSignIn(username, password)}>
                        Sign-in
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default LoginPanel;