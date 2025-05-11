import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TutorPostNoComment from "../Widget/TutorPostNoComment";
import { TutorPostProps } from "../Widget/TutorPost";
import axios from "axios";
import TutorFeedback from "../TutorPanels/TutorFeedback";

function CommentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, tutorUsername } = location.state || {}; // Receive both usernames
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("1");

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
          uname: tutorUsername, // Use tutorUsername for filtering posts
        });
        const rawPosts: any[] = response.data.posts;

        const formattedPosts: TutorPostProps[] = rawPosts.map((post: any) => ({
          id: post.id,
          username: post.username || 'Unknown',
          name: post.name || 'Unknown',
          gender: post.gender || 'Unknown',
          subject: post.subject || [],
          district: post.district || [],
          tuitionFee: post.fee || 'Not specified',
          availableDays: post.day || [],
          contact: post.contact || 'Not Spec',
          selfIntro: post.selfIntro || "None",
        }));
        setDisplayPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching initial posts:', error);
        setDisplayPosts([]);
      }
    };
    fetchInitialPosts();
  }, [tutorUsername]); // Add tutorUsername as a dependency

  const HandleComment = async () => {
    console.log(rate, comment);
    if (comment === "") {
      alert("Failed. Comment cannot be empty.");
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/comment', {
          comment: comment,
          rating: rate,
          tutorName: tutorUsername, // Use tutorUsername for the comment
          username: username, // Include the logged-in username if needed
        });
        alert("Completed. Thank you for your comment");
      } catch (error) {
        alert("Failed. Please Try Again.");
      }
    }
    setComment("");
    setRate("1");
  };

  const HandleBack = () => {
    navigate("/Content/StudentPage");
  };

  return (
    <Container fluid>
      <Row>
        <Col className="bg-light" md="3">
          <h3>Your Comment</h3>
          <Form>
            <Form.Group>
              <Form.Label>Leave your comments for @{tutorUsername}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type here"
                rows={8}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Row>
                <Col md="2">Rating:</Col>
                <Col md="6">
                  <Form.Select value={rate} onChange={(e) => setRate(e.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Select>
                </Col>
                <Col md="2">
                  <Button variant="success" onClick={HandleComment}>
                    Comment
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <Button variant="secondary" onClick={HandleBack}>Back</Button>
        </Col>
        <Col md="6">
          <h3>Posts of @{tutorUsername}</h3>
          {displayPosts.length > 0 ? (
            <ul>
              {displayPosts.map((post, index) => (
                <TutorPostNoComment key={index} {...post} />
              ))}
            </ul>
          ) : (
            <p>No posts found.</p>
          )}
        </Col>
        <Col className="bg-light" md="3">
          <h3>Others' Feedback</h3>
          <TutorFeedback username={tutorUsername} />
        </Col>
      </Row>
    </Container>
  );
}

export default CommentPage;