import axios from "axios"

const Invoice = (props) => {
    const { invoice = {} } = props
    const onClickPayNowHandler = async (invoice) => {
        console.log("Pay now clicked", invoice)
        let res = await axios.post(`/invoice/pay`, { invoice })
        if (res.status) {
            window.location.href = res.data.message
        }
        console.log(res)
    }
    return (
        <>
            <tr>
                {/* <th scope="row">{index}</th> */}
                <td>{invoice.email}</td>
                <td>{invoice.purpose}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status.toLowerCase() !== "paid" ?
                    <button className="btn btn-info" onClick={() => { onClickPayNowHandler(invoice) }}>Pay Now</button> :
                    invoice.status.toUpperCase()}
                </td>
            </tr>
        </>
    )
}

export default Invoice