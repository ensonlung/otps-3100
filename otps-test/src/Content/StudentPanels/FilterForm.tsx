import { Form, Button } from "react-bootstrap"
import { useState } from "react"

function FilterForm() {
    // Options
    const subjects = [
        "All", "Chinese", "English", "Mathematics", "History", "Chinese History", "Chemistry", "Biology", "Physics", "Geography", "Economics"
    ]
    const districts = [
        "All", "Island", "kwaiTsing", "North", "Sai Kung", "Sha Tin", "Tai Po", "Tsuen Wan", "Tuen Mun", "Yuen Long",
        "Kowloon City", "Kwun Tong", "Sham Shui Po", "Wong Tai Sin", "Yau Tsim Mong",
        "Central and Western", "Eastern", "Southern", "Wan Chai"
    ]
    const days = [
        "All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]
    const times = [
        "All", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00"
    ]
    const fees = [
        "All", "<$150", "$150-$250", "$250-$350", ">$350"
    ]

    // useStates
    const [subject, setSubject] = useState("All")
    const [gender, setGender] = useState("All")
    const [district, setDistrict] = useState("All")
    const [day, setDay] = useState("All")
    const [time, setTime] = useState("All")
    const [fee, setFee] = useState("All")

    // On Filter Button Click
    const HandleFilter = async() => {
        // TODO(Mario)
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
                            subjects.map((subject, index) => (<option key={index}>{subject}</option>))
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
                            districts.map((district, index) => (<option key={index}>{district}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Day:</Form.Label>
                    <Form.Select onChange={(e) => setDay(e.target.value)}>
                        {
                            days.map((day, index) => (<option key={index}>{day}</option>))
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