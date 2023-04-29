import {useEffect, useState} from "react";
import InvoiceStyle from "@/styles/sellBox.module.css"
import {useRouter} from "next/router";

const InvoiceTable = () => {
    const [orders, setOrders] = useState([])
    const [searchItem, setSearchItem] = useState("")

    const navigator = useRouter()

    const fetchOrderData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api-seller/order-list/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrders(result)
            })
            .catch(error => console.log('error', error));
    }

    function formatDate(date) {
        const options = {day: 'numeric', month: 'long', year: 'numeric'};
        const day = ordinalSuffix(date.getDate());
        const formattedDate = date.toLocaleDateString(undefined, options);
        return `${formattedDate}`;
    }

    function ordinalSuffix(day) {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    }

    const handlePrint = (order_id) => {
        navigator.push({
            pathname: `/seller/components/PageInvoice/`,
            query: {order_id: order_id},
        })
    };

    const filterOrder = orders.filter((order) =>
        order.id.toString().includes(searchItem)
    );

    useEffect(() => {
        fetchOrderData()
    }, [])

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by Order ID"
                    value={searchItem}
                    onChange={e => setSearchItem(e.target.value)}
                />
                <div className={"row"} style={{
                    backgroundColor: "rgba(254, 159, 67, 0.08)",
                    textAlign: "center",
                    paddingTop: "10px",
                    color: "#FF9F43"
                }}>
                    <div className={"col-md-3"}>
                        Order ID
                    </div>
                    <div className={"col-md-3"}>
                        Date
                    </div>
                    <div className={"col-md-3"}>
                        Customer
                    </div>
                    <div className={"col-md-3"}>
                        Action
                    </div>
                </div>
                <hr/>
                {filterOrder ?
                    filterOrder.map((item, index) => {
                        const createdAtDate = new Date(item.created_at);

                        // Format the date
                        const formattedDate = formatDate(createdAtDate);

                        const formattedTime = createdAtDate.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: 'numeric'
                        });

                        return (
                            <div className={"row text-center mb-2 mt-2 " + InvoiceStyle.tabRow} key={index}>
                                <div className={"col-md-3"}>
                                    seba2023oid-{item.id}
                                </div>
                                <div className={"col-md-3"}>
                                    {formattedDate}, {formattedTime}
                                </div>
                                <div className={"col-md-3"}>
                                    {item.get_customer_name}
                                </div>
                                <div className={"col-md-3"}>
                                    <button className={"btn btn-danger"} onClick={() => handlePrint(item.id)}>Print</button>
                                </div>
                            </div>
                        )
                    })
                    : ""}
            </div>
        </>
    );
}

export default InvoiceTable;
