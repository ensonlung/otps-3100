import { Container, Row, Col } from "react-bootstrap";
import FilterForm from "./FilterForm"
import SearchBar from "./SearchBar"
import TutorPost from "../Widget/TutorPost"
import { useState, useEffect } from "react";
import { TutorPostProps } from "../Widget/TutorPost";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const StudentPostManager: React.FC = () => {
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

    const navigate = useNavigate()
    const HandleEnterCommentPage = (username: string) => {
        navigate("./Comment", { state: {username} });
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        {displayPosts.length > 0 ? (
                        <ul>
                            {displayPosts.map((post) => TutorPost(post, HandleEnterCommentPage))}
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