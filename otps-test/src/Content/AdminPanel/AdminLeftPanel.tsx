import { Container, Row, Card, Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";

interface AdminLeftPanelProp {
    username: string;
}

function AdminLeftPanel({username}: AdminLeftPanelProp) {
    const navigate = useNavigate();
    const [showLicense, setShowLicense] = useState(false);
    const [license, setLicense] = useState("")

    useEffect(() => {
        const fetchLicenses = async () => {
          try {
            const response = await axios.post('http://localhost:3000/api/license-get');
            const licenses = response.data.license;
            setLicense(licenses);
          } catch (error) {
            console.error('Error fetching licenses:', error);
            setLicense("Error fetching license");
          }
        };
        fetchLicenses();
      }, []);

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center mb-2 mt-5">
                    <center><h1>OTPS</h1></center>
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    (Admin Mode)
                </Row>
                <Row className="justify-content-md-center mb-2 mt-2">
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            Username: {username}
                        </Card.Body>
                    </Card>
                </Row>
                <Button variant="success" onClick={() => navigate("/")}>
                    Logout
                </Button>
                <Button variant="primary" onClick={() => setShowLicense(true)}>
                    Get License Key
                </Button>            
            </Container>

            <Modal show={showLicense} backdrop="static" onHide={() => {setShowLicense(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>License Key</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {license}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowLicense(false)}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminLeftPanel;