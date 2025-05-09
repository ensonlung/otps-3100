import { Row, Col, Card, Form, Button } from "react-bootstrap"
import { useState } from "react"

function SearchBar() {
    // useStates
    const [name, setName] = useState("")

    // On Filter Button Click
    const HandleSearch = async() => {
        // TODO(Mario)
        console.log(name);
    }

    return (
        <>
            <h3>Search</h3>
            <Row>
                <Col md="8">
                    <Form>
                        <Form.Control type="text" placeholder="Tutor Name" onChange={(e) => setName(e.target.value)} />
                        </Form>
                </Col>
                <Col md="4">
                    <Button variant="success" onClick={HandleSearch}>Search</Button>
                </Col>
            </Row>            
        </>
    );
}

export default SearchBar;