import { useState } from "react";
import axios from "axios"
const Home = () => {
    const initialValues = {
        email: "",
        purpose: "",
        amount: ""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const onSubmitFormHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/payment/create", {
                payment: {
                    email: formValues.email,
                    amount: formValues.amount,
                    purpose: formValues.purpose
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.data.status) {
                setFormValues(initialValues)
            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    return (
        <div className="container" style={{ borderRadius: "10px", marginTop: "50px" }}>
            <h2 className="text-center">Create Payment Link</h2>
            <form onSubmit={onSubmitFormHandler}>
                <div className="form-group">
                    <lable htmlFor="email">Email</lable>
                    <input className="form-control"
                        id="forEmail"
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <lable htmlFor="forPurpose">Purpose</lable>
                    <input className="form-control"
                        id="forPurpose"
                        type="text"
                        name="purpose"
                        value={formValues.purpose}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <lable htmlFor="forAmount">Amount</lable>
                    <input className="form-control"
                        id="forAmount"
                        type="number"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="pt-1">
                    <button
                        className="btn btn-primary"
                        type="submit">
                        Create
                    </button>
                    <button
                        className="btn btn-warning m-1"
                        type="button"
                        onClick={() => { setFormValues(initialValues) }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Home