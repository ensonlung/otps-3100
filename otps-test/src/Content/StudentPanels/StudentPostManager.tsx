import { Container, Row, Col } from "react-bootstrap";
import FilterForm from "./FilterForm";
import SearchBar from "./SearchBar";
import TutorPost from "../Widget/TutorPost";
import { useState, useEffect } from "react";
import { TutorPostProps } from "../Widget/TutorPost";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TutorPostWrapper: React.FC<{
  post: TutorPostProps;
  onComment: (tutorUsername: string) => void;
  index: number;
}> = ({ post, onComment, index }) => {
  return <>{TutorPost(post, onComment)}</>;
};

interface StudentPostManagerProps {
  username?: string; 
}

const StudentPostManager: React.FC<StudentPostManagerProps> = ({ username }) => {
  const [displayPosts, setDisplayPosts] = useState<TutorPostProps[]>([]);
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/filter-post', {
          subject: "Any",
          gender: "Any",
          district: "Any",
          day: "Any",
          time: "Any",
          fee: "Any",
          uname: "Any",
          startTime: "Any",
          endTime: "Any",
        });
        const rawPosts: any[] = response.data.posts;

        const formattedPosts: TutorPostProps[] = rawPosts.map((post: any) => ({
          id: post.id,
          time: post.time, 
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
  }, []);

  const navigate = useNavigate();
  const HandleEnterCommentPage = (tutorUsername: string) => {
    navigate("./Comment", { state: { username, tutorUsername } }); // Pass both usernames
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          {displayPosts.length > 0 ? (
            <ul>
              {displayPosts.map((post, index) => (
                <TutorPostWrapper
                  key={index}
                  post={post}
                  onComment={HandleEnterCommentPage}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <p>No posts found.</p>
          )}
        </Col>
        <Col className="bg-light" md="4">
          <SearchBar setDisplayPosts={setDisplayPosts} />
          <br />
          <FilterForm setDisplayPosts={setDisplayPosts} />
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPostManager;