import ProductsTable from "@/pages/seller/components/ProductsTable";
import productStyle from "@/styles/productsPage.module.css";
import Image from "next/image";
import pdf from "@/assets/icons/pdf.svg";
import excel from "@/assets/icons/excel.svg";
import printer from "@/assets/icons/printer.svg";
import {useEffect, useState} from "react";
import ProductsTableForUpdate from "@/pages/seller/components/ProductsTableForUpdate";

const UpdateProductForm = () => {
    const [searchItem, setSearchItem] = useState("")
    const [product_name, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [alertQuantity, setAlertQuantity] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [buyingPrice, setBuyingPrice] = useState("");
    const [productStatus, setProductStatus] = useState(true);

    const onHandleSearchChange = (e) => {
        setSearchItem(e.target.value);
    }

    const onStartUpdate = (n, q, aq, sp, bp, ps) => {
        document.getElementById('updateFormCard').style.display = "block";
        setProductName(n)
        setQuantity(q)
        setAlertQuantity(aq)
        setSellingPrice(sp)
        setBuyingPrice(bp)
        setProductStatus(ps)
    }

    useEffect(() => {
        document.getElementById('updateFormCard').style.display = "none";
    }, [])

    return (
        <>
            <div className={"card "} id={"updateFormCard"}>
                <div className={"card-body"}>
                    <div>
                        <form className={"form-group"}>
                            <legend className={"text-center"}>Update Product Information</legend>
                            <div className={"row"}>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>
                                        <label>Product Name</label>
                                        <input className={"form-control"} placeholder={"Product Name"}
                                               value={product_name} disabled={true}/>
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Quantity</label>
                                        <input type={"number"} className={"form-control"} placeholder={"Quantity"}
                                               value={quantity}
                                               onChange={e => setQuantity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Minimum Alert Quantity</label>
                                        <input type={"number"} className={"form-control"}
                                               placeholder={"Minimum Alert Quantity"}
                                               value={alertQuantity}
                                               onChange={e => setAlertQuantity(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Selling Price</label>
                                        <input type={"number"} step="0.01" className={"form-control"}
                                               placeholder={"Selling Price"}
                                               value={sellingPrice}
                                               onChange={e => setSellingPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Buying Price</label>
                                        <input type={"number"} step="0.01" className={"form-control"}
                                               placeholder={"Buying Price"}
                                               value={buyingPrice}
                                               onChange={e => setBuyingPrice(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>

                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                        <input
                                            type="checkbox"
                                            placeholder="Status"
                                            checked={productStatus}
                                            onChange={e => setProductStatus(!productStatus)}
                                        /> <label>Status</label>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                       <button className={"btn btn-success w-100"}>Done</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={"card mt-5"}>
                <div className={"card-body"}>
                    <div>
                        <div className={"row mb-4"}>
                            <div className={"col-md-8"}>
                                <input value={searchItem} onChange={onHandleSearchChange}
                                       className={productStyle.searchInputField} placeholder={"search "}/>
                                <button className={"btn " + productStyle.searchBtn}>
                                    <i className={"fa fa-search"}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ProductsTableForUpdate searchValue={searchItem} onStartUpdate={onStartUpdate}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProductForm;