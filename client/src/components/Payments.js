import { useState, useEffect } from "react";
import Payment from "./Payment";

const Payments = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const fetchPayments = async () => {
        console.log("fetchPayments called")
        setLoading(true)
        let res = await fetch(`/payment/list`);
        res = await res.json();
        setList(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <div className="container-fluid">
            <h2 className="text-center">Payments</h2>
            {loading && <h6 className="text-center">Loading...</h6>}
            {!loading && list.length === 0 && <h6 className="text-center">No Payments found!!</h6>}
            {list.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => {
                            return (
                                <Payment payment={item} />
                            )
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

export default Payments