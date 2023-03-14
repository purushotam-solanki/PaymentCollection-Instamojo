import { useState, useEffect } from "react";
import Invoice from "./Invoice";

const Invoices = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const fetchInvoices = async () => {
        console.log("fetchInvoices called")
        setLoading(true)
        let res = await fetch(`/invoice/list`);
        res = await res.json();
        setList(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchInvoices()
    }, [])

    return (
        <div className="container-fluid">
            <h2 className="text-center">Invoices</h2>
            {loading && <h6 className="text-center">Loading...</h6>}
            {!loading && list.length === 0 && <h6 className="text-center">No Invoice found!!</h6>}
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
                                <Invoice invoice={item} />
                            )
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

export default Invoices
