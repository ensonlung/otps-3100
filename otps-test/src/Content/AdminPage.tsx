import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AdminLeftPanel from "./AdminPanel/AdminLeftPanel";
import AdminPost, { AdminPostProps } from "./AdminPanel/AdminPost";
import AdminComment from "./AdminPanel/AdminComment";
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";

function AdminPage() {
    const location = useLocation();
    const {username, password} = location.state || {};

    const [displayPosts, setDisplayPosts] = useState<AdminPostProps[]>([]);
        useEffect(() => {
            // TODO: after search controller is done, search with username for posts
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
    
                const formattedPosts: AdminPostProps[] = rawPosts.map((post: any) => ({
                    username: post.username || 'Unknown',
                    name: post.name || 'Unknown',
                    gender: post.gender || 'Unknown',
                    subject: post.subject || [],
                    district: post.district || [],
                    tuitionFee: post.fee || 'Not specified',
                    availableDays: post.day || [],
                    contact: post.contact || 'Not Spec',
                    reportReason: ["Improper Fee"],
                    specificReason: "",
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
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="2">
                        <AdminLeftPanel username={username} password={password}/>
                    </Col>
                    <Col md="6">
                        <h3>Post Reports</h3>
                        {displayPosts.length > 0 ? (
                        <ul>
                            {displayPosts.map((post) => <AdminPost {...post}/>)}
                        </ul>
                        ) : (
                            <p>No posts found.</p>                        
                        )}
                    </Col>
                    <Col className="bg-light" md="4">
                        <h3>Feedback Reports</h3>
                        <AdminComment/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminPage;