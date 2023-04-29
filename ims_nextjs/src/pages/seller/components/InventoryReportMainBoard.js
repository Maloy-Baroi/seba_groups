import MainboardHead from "@/pages/seller/components/MainboardHead";
import InvoiceTable from "@/pages/seller/components/InvoiceTable";
import InventoryReport from "@/pages/seller/inventory-report";
import ExpiryProductReportTable from "@/pages/seller/components/ExpiryProductReportTable";
import {useEffect, useState} from "react";
import StockFinishedProduct from "@/pages/seller/components/StockFinishedProduct";

const InventoryReportMainBoard = () => {

    const [showWhat, setShowWhat] = useState(true);

    const onHandleProductCategoryChange = () => {
      setShowWhat(!showWhat)
    }

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Inventory Report"} h6Text={"Stock Management"} />
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className={"row mb-5 mt-5"}>
                                    <div className={"col-md-6"}>
                                        <button className={"btn btn-warning"} onClick={onHandleProductCategoryChange}>
                                            Almost Expiry Products
                                        </button>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <button className={"btn btn-danger"} onClick={onHandleProductCategoryChange}>
                                            Almost Stock-out Products
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {showWhat ?
                                <ExpiryProductReportTable />
                                :
                                <StockFinishedProduct />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryReportMainBoard;
