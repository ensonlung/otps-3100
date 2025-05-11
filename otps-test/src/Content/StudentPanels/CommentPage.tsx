import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import TutorPostNoComment from "../Widget/TutorPostNoComment";
import { TutorPostProps } from "../Widget/TutorPostNoComment";
import axios from "axios";
import TutorFeedback from "../TutorPanels/TutorFeedback";

function CommentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {};
    const [comment, setComment] = useState("")
    const [rate, setRate] = useState("1")

    const [displayPosts, setDisplayPosts] = useState<TutorPostProps[]>([]);
    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
            const response = await axios.post('http://localhost:3000/api/filter-post', {
                subject: "All",
                gender: "All",
                district: "All",
                day: "All",
                time: "All",
                fee: "All",
            });
            const rawPosts: any[] = response.data.posts;

            const formattedPosts: TutorPostProps[] = rawPosts.map((post: any) => ({
                username: post.username || 'Unknown',
                name: post.name || 'Unknown',
                gender: post.gender || 'Unknown',
                subject: post.subject || [],
                district: post.district || [],
                tuitionFee: post.fee || 'Not specified',
                availableDays: post.day || [],
                contact: post.contact || 'Not Spec',
            }));
            setDisplayPosts(formattedPosts);
            } catch (error) {
            console.error('Error fetching initial posts:', error);
            setDisplayPosts([]);
            }
        };
        fetchInitialPosts();
    }, []);


    const HandleComment = async () => {
        // TODO(mario):
        console.log(rate, comment);
        if (comment == "") alert("Failed. Comment cannot be empty.");
        else alert("Completed. Thank you for your comment");
        setComment("")
        setRate("1")
    }
    const HandleBack = () => {
        navigate("/Content/StudentPage");
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="3">
                        <h3>Your Comment</h3>
                        <Form>
                            <Form.Group>
                                <Form.Label>Leave your comments for @{username}</Form.Label>
                                <Form.Control as="textarea" placeholder="Type here" rows={8} value={comment} onChange={(e) => {setComment(e.target.value)}}/>
                                <Row>
                                    <Col md="2">Rating:</Col>
                                    <Col md="6">
                                        <Form.Select value={rate} onChange={(e) => {setRate(e.target.value)}}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md="2"><Button variant="success" onClick={HandleComment}>Comment</Button></Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <Button variant="secondary" onClick={HandleBack}>Back</Button>
                    </Col>
                    <Col md="6">
                        <h3>Posts of @{username}</h3>
                        {displayPosts.length > 0 ? (
                        <ul>
                            {displayPosts.map((post) => <TutorPostNoComment {...post}/>)}
                        </ul>
                        ) : (
                            <p>No posts found.</p>                        
                        )}
                    </Col>
                    <Col className="bg-light" md="3">
                        <h3>Others' Feedback</h3>
                        <TutorFeedback/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CommentPage;