import axios from "axios"

const Payment = (props) => {
    const { payment = {} } = props
    const onClickPayNowHandler = async (payment) => {
        console.log("Pay now clicked", payment)
        let res = await axios.post(`/payment/pay`, { payment })
        if (res.status) {
            window.location.href = res.data.message
        }
        console.log(res)
    }
    return (
        <>
            <tr>
                {/* <th scope="row">{index}</th> */}
                <td>{payment.email}</td>
                <td>{payment.purpose}</td>
                <td>{payment.amount}</td>
                <td>{payment.status.toLowerCase() !== "paid" ?
                    <button className="btn btn-info" onClick={() => { onClickPayNowHandler(payment) }}>Pay Now</button> :
                    payment.status.toUpperCase()}
                </td>
            </tr>
        </>
    )
}

export default Payment