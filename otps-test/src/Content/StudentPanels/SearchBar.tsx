import { Row, Col, Card, Form, Button } from "react-bootstrap"
import { useState } from "react"
import { FilterFormProps } from "./FilterForm"
import { TutorPostProps } from "../Widget/TutorPost"
import axios from "axios"

const SearchBar: React.FC<FilterFormProps> = ({ setDisplayPosts }) => {   
    // useStates
    const [name, setName] = useState("")

    // On Filter Button Click
    const HandleSearch = async() => {
        try{
            const response = await axios.post('http://localhost:3000/api/search', {
                anyName: name,
            });
            const rawPosts: any[] = response.data.posts;
            
            const formattedPost: TutorPostProps[] = rawPosts.map((post: any) => ({
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

            setDisplayPosts(formattedPost);
        } catch (error){
            console.error("Error Search");
            setDisplayPosts([]);
        }
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