import { Row, Col, Modal, Button, Form } from "react-bootstrap"
import Select from "react-select"
import { useState, useEffect } from "react"
import { subjects, districts, days } from "../../TutorPostInfo.cjs"
import axios from "axios";
import { StudentLeftPanelProp } from "../StudentPanels/StudentLeftPanel";
import TutorPostSelf from "./TutorPostSelf";
import { TutorPostProps } from "./TutorPostSelf";

function TutorPostForm({username}: StudentLeftPanelProp) {
    // useStates
    const [showModal, setShowModal] = useState(false)
    const [displayPosts, setDisplayPosts] = useState<TutorPostProps[]>([]);

    // new post useStates
    const [subject, setSubject] = useState<string[]>([])
    const [district, setDistrict] = useState<string[]>([])
    const [day, setDay] = useState<string[]>([])
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [fee, setFee] = useState("0")
    const [selfIntro, setSelfIntro] = useState("")

    // Handle Create Psot
    const HandleCreatePost = async() => {
        try{
            const createPost = await axios.post('http://localhost:3000/api/create-post', {
                postContent: {username, subject, district, day, startTime, endTime, fee, selfIntro}
            });
            console.log(subject, district, day, startTime, endTime, fee, selfIntro);
            setShowModal(false);
        }
        catch (error){
            console.error("Error Post Creation");
        }
    }

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
                uname: username,
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

    return (
        <>
            <h3>My Posts</h3>
            <Button variant="success" onClick={() => {setShowModal(true)}}>Create Post</Button>

            

            <Modal show={showModal} backdrop="static" onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Select isMulti options={subjects.slice(1)} onChange={(e) => {setSubject(Array.from(e, (subject) => subject.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Select isMulti options={districts.slice(1)} onChange={(e) => {setDistrict(Array.from(e, (district) => district.label))}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Day</Form.Label>
                            <Select isMulti options={days.slice(1)} onChange={(e) => {setDay(Array.from(e, (day) => day.label))}}/>
                        </Form.Group>
                        <Row>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" onChange={(e) => setStartTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>End Time:</Form.Label>
                                    <Col sm="12"><Form.Control type="time" onChange={(e) => setEndTime(e.target.value)}/></Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Per Hour Tuition Fee (in HKD)</Form.Label>
                            <Form.Control type="int" placeholder="0" onChange={(e) => setFee(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Self Description</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Describe Yourself" onChange={(e) => setSelfIntro(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false)}}>Cancel</Button>
                    <Button variant="success" onClick={HandleCreatePost}>Post</Button>
                </Modal.Footer>
            </Modal>

            {displayPosts.length > 0 ? (
                <ul>
                    {displayPosts.map((post, index) => (
                        <TutorPostSelf {...post}/>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}

        </>
    );
}

export default TutorPostForm;