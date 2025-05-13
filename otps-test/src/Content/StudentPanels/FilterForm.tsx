import { Form, Button } from "react-bootstrap"
import React, { useState } from "react"
import { subjects, districts, days, fees } from "../../TutorPostInfo.cjs"
import axios from "axios";
import { TutorPostProps } from "../Widget/TutorPost";

export interface FilterFormProps {
    setDisplayPosts: (posts: TutorPostProps[]) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ setDisplayPosts }) => {   
    const [subject, setSubject] = useState("Any")
    const [gender, setGender] = useState("Any")
    const [district, setDistrict] = useState("Any")
    const [day, setDay] = useState("Any")
    const [startTimeOption, setStartTimeOption] = useState("Any"); // New state for start time option
    const [endTimeOption, setEndTimeOption] = useState("Any");    
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [fee, setFee] = useState("Any")

    // On Filter Button Click
    const HandleFilter = async(e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        try {
            const filteredPost = await axios.post('http://localhost:3000/api/filter-post', {
                subject: subject,
                gender: gender,
                district: district,
                day: day,
                startTime: (startTimeOption === "Any" ? "Any" : startTime),
                endTime: (endTimeOption === "Any" ? "Any" : endTime),
                fee: fee,
                uname: 'Any',
                getHide: false,  
            });
            const rawPosts: any[] = filteredPost.data.posts;

            const formattedPost: TutorPostProps[] = rawPosts.map((post: any) => ({
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
                isHide: post.isHide,
                avgRating: post.avgRating,
            }));
            setDisplayPosts(formattedPost);
        }
        catch (error) {
            console.error("Error Filtering");
            setDisplayPosts([]);
        }
        console.log(subject, gender, district, day, startTime, endTime, fee);
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
                        <option key="0">Any</option>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Start Time:</Form.Label>
                        <Form.Select
                            onChange={(e) => {
                            setStartTimeOption(e.target.value);
                            if (e.target.value === "Any") setStartTime(""); // Clear startTime if "Any" is selected
                            }}
                            value={startTimeOption}
                        >
                            <option>Any</option>
                            <option>Specific</option>
                        </Form.Select>
                        {startTimeOption === "Specific" && (
                            <Form.Control
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-2"
                            />
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>End Time:</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                        setEndTimeOption(e.target.value);
                        if (e.target.value === "Any") setEndTime(""); // Clear endTime if "Any" is selected
                        }}
                        value={endTimeOption}
                    >
                        <option>Any</option>
                        <option>Specific</option>
                    </Form.Select>
                    {endTimeOption === "Specific" && (
                        <Form.Control
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mt-2"
                        />
                    )}
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
