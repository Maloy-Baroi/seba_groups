import productStyle from "@/styles/productsPage.module.css";
import Image from "next/image";
import pdf from "../../../assets/icons/pdf.svg"
import excel from "../../../assets/icons/excel.svg"
import printer from "../../../assets/icons/printer.svg"
import ProductsTable from "@/pages/seller/components/ProductsTable";
import {useEffect, useRef, useState} from "react";
import MainboardHead from "@/pages/seller/components/MainboardHead";

const ProductsMainBoard = ({ onHandleCartLength }) => {
    const [searchItem, setSearchItem] = useState("")

    const onHandleSearchChange = (e) => {
      setSearchItem(e.target.value);
    }

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Product List"} h6Text={"Manage your products"} />
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>
                                    <input value={searchItem} onChange={onHandleSearchChange}
                                           className={productStyle.searchInputField} placeholder={"search "}/>
                                    <button className={"btn " + productStyle.searchBtn}>
                                        <i className={"fa fa-search"}></i>
                                    </button>
                                </div>
                                <div className={"col-md-4 " + productStyle.extraWork}>
                                  <span>
                                      <Image src={pdf} alt={"Make it PDF"}/>
                                  </span>
                                    <span>
                                      <Image src={excel} alt={"Make it Excel"}/>
                                  </span>
                                    <span>
                                      <Image src={printer} alt={"Print it"}/>
                                  </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ProductsTable searchValue={searchItem} onHandleCartLength={onHandleCartLength} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductsMainBoard;
