import { Form, Button } from "react-bootstrap"
import React, { useState } from "react"
import { subjects, districts, days, times, fees } from "../../TutorPostInfo.cjs"
import axios from "axios";
import { TutorPostProps } from "../Widget/TutorPost";

export interface FilterFormProps {
    setDisplayPosts: (posts: TutorPostProps[]) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ setDisplayPosts }) => {   
    const [subject, setSubject] = useState("All")
    const [gender, setGender] = useState("All")
    const [district, setDistrict] = useState("All")
    const [day, setDay] = useState("All")
    const [time, setTime] = useState("All")
    const [fee, setFee] = useState("All")

    // On Filter Button Click
    const HandleFilter = async(e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        try {
            const filteredPost = await axios.post('http://localhost:3000/api/filter-post', {
                subject: subject,
                gender: gender,
                district: district,
                day: day,
                time: time,
                fee: fee,
                uname: 'All',
            });
            const rawPosts: any[] = filteredPost.data.posts;

            const formattedPost: TutorPostProps[] = rawPosts.map((post: any) => ({
                username: post.username || 'Unknown',
                name: post.name || 'Unknown',
                gender: post.gender || 'Unknown',
                subject: post.subject || [],
                district: post.district || [],
                tuitionFee: post.fee || 'Not specified',
                availableDays: post.day || [],
                contact: post.contact || 'Not Spec',
            }));

            setDisplayPosts(formattedPost);
        }
        catch (error) {
            console.error("Error Filtering");
            setDisplayPosts([]);
        }
        console.log(subject, gender, district, day, time, fee);
    }

    return (
        <>
            <h3>Filter</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Subject:</Form.Label>
                    <Form.Select onChange={(e) => setSubject(e.target.value)}>
                        {
                            subjects.map((subject, index) => (<option key={index}>{subject.label}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select onChange={(e) => setGender(e.target.value)}>
                        <option key="0">All</option>
                        <option key="1">Male</option>
                        <option key="2">Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>District:</Form.Label>
                    <Form.Select onChange={(e) => setDistrict(e.target.value)}>
                        {
                            districts.map((district, index) => (<option key={index}>{district.label}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Day:</Form.Label>
                    <Form.Select onChange={(e) => setDay(e.target.value)}>
                        {
                            days.map((day, index) => (<option key={index}>{day.label}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time:</Form.Label>
                    <Form.Select onChange={(e) => setTime(e.target.value)}>
                        {
                            times.map((time, index) => (<option key={index}>{time}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Expected Fee:</Form.Label>
                    <Form.Select onChange={(e) => setFee(e.target.value)}>
                        {
                            fees.map((fee, index) => (<option key={index}>{fee}</option>))
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            <br/>
            <Button variant="success" onClick={HandleFilter}>
                Filter
            </Button>
        </>
    );
}

export default FilterForm;
