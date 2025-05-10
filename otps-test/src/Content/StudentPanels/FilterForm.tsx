import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { subjects, districts, days, times, fees } from "../../TutorPostInfo.cjs"

function FilterForm() {

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