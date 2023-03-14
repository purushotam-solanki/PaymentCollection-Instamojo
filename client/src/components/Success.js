import { Link } from "react-router-dom"

const Success = () => {
    return (
        <div className="text-center">
            <h4>Your payment is Success</h4>
            <h5>go to <Link to={"/payments"}>Payments</Link> for details.</h5>
        </div>
    )
}

export default Success