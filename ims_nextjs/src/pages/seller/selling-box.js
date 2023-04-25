import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import SellingBoxMainBoard from "@/pages/seller/components/SellingBoxMainBoard";
import {useEffect, useState} from "react";

const SellingBox = () => {
    const [boxProduct, setBoxProduct] = useState([])
    const takeCartData = () => {
        const sellCard = JSON.parse(localStorage.getItem('sellcard') || '[]');
        setBoxProduct(sellCard)
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
    };


    useEffect(() => {
        takeCartData();
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
                                                 handleAddQuantity={handleAddQuantity}/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SellingBox;
