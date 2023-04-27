import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import SellingBoxMainBoard from "@/pages/seller/components/SellingBoxMainBoard";
import {useEffect, useState} from "react";

const SellingBox = () => {
    const [boxProduct, setBoxProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const takeCartData = () => {
        const sellCard = JSON.parse(localStorage.getItem('sellcard') || '[]');
        setBoxProduct(sellCard)
    }

    const getTotalPrice = () => {
        const sellCard = JSON.parse(localStorage.getItem('sellcard') || '[]');
        let total = 0;
        for (let i = 0; i < sellCard.length; i++) {
            total += sellCard[i]['quantity'] * sellCard[i]['thisProductPrice'];
        }
        setTotalPrice(total)
    }

    const handleAddQuantity = (id) => {
        const updatedBoxProduct = boxProduct.map((item) => {
            if (item.id === id) {
                return {...item, quantity: item.quantity + 1, existingQuantity: item.existingQuantity - 1};
            } else {
                return item;
            }
        });
        setBoxProduct(updatedBoxProduct);
        localStorage.setItem('sellcard', JSON.stringify(updatedBoxProduct));
        getTotalPrice()
    };


    const handleMinusQuantity = (itemId) => {
        const updatedItems = boxProduct.map((item) => {
            if (item.id === itemId && item.quantity > 1) {
                // Decrease the quantity by 1
                return {...item, quantity: item.quantity - 1, existingQuantity: item.existingQuantity + 1};
            }
            return item;
        });
        setBoxProduct(updatedItems);

        // Update the localStorage value
        const updatedCart = JSON.stringify(updatedItems);
        localStorage.setItem('sellcard', updatedCart);
        getTotalPrice()
    };

    const handleSellSubmission = async (customerName, customerPhn) => {
        // e.preventDefault();

        let prod_n_qty = `{
            "id": ${localStorage.getItem("sellcard")['id']},
            "qty": ${localStorage.getItem("sellcard")['quantity']}
        }`
        console.log(localStorage.getItem("sellcard"))
        try {
            const response = await fetch('http://127.0.0.1:8000/api-seller/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({
                    "products_n_quantity": prod_n_qty,
                    "customerName": customerName,
                    "phone_number": customerPhn,
                    "totalPrice": totalPrice,
                    "access_token": localStorage.getItem('access_token')
                }),
            });

            if (response.ok) {
                localStorage.removeItem("sellcard")
                
            } else {
                console.log("something wrong!")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    useEffect(() => {
        takeCartData();
        getTotalPrice();
    }, [])

    return (
        <>
            <OnlyHead page={"Selling Box"}/>
            <main>
                <DashboardNavbar/>
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"category"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <SellingBoxMainBoard boxItems={boxProduct} handleMinusQuantity={handleMinusQuantity}
                                                 handleAddQuantity={handleAddQuantity}
                                                 handleSellSubmission={handleSellSubmission}
                                                 totalPrice={totalPrice}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SellingBox;
