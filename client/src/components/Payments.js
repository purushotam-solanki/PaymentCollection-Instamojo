import { useState, useEffect } from "react";
import axios from "axios";

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
    const onClickPayNowHandler = async (payment) => {
        console.log("Pay now clicked", payment)
        let res = await axios.post(`/payment/pay`, { payment })
        if (res.status) {
            window.location.href = res.data.message
        }
        console.log(res)
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
                            return (<tr>
                                {/* <th scope="row">{index}</th> */}
                                <td>{item.email}</td>
                                <td>{item.purpose}</td>
                                <td>{item.amount}</td>
                                <td>{item.status.toLowerCase() !== "paid" ?
                                    <button className="btn btn-info" onClick={() => { onClickPayNowHandler(item) }}>Pay Now</button> :
                                    item.status.toUpperCase()}
                                </td>
                            </tr>
                            )
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

export default Payments