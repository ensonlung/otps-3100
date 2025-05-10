import { Container, Row, Col } from "react-bootstrap";
import FilterForm from "./FilterForm"
import SearchBar from "./SearchBar"
import TutorPost from "../Widget/TutorPost"
import { useState } from "react";
import { TutorPostProps } from "../Widget/TutorPost";

const StudentPostManager: React.FC = () => {
    const [displayPosts, setDisplayPosts] = useState<TutorPostProps[]>([{name: "ss", gender: "Male", subject: ["English", "Math"], availableDays: ["Monday"], district: ["Taiwai"], tuitionFee: "230", contact: "23"}]);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        {displayPosts.length > 0 ? (
                            <ul>
                                {displayPosts.map((post) => TutorPost(post))}
                            </ul>
                        ) : (
                            <p>No posts found.</p>
                            )}
                    </Col>
                    <Col className="bg-light" md="4">
                        <SearchBar />
                        <br/>
                        <FilterForm setDisplayPosts={ setDisplayPosts }/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentPostManager;