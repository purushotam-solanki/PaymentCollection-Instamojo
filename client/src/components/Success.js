import { Link } from "react-router-dom"

const Success = () => {
    return (
        <div className="text-center">
            <h4>Your payment is Successfull</h4>
            <h5>go to <Link to={"/invoices"}>Invoices</Link> for details.</h5>
        </div>
    )
}

export default Success