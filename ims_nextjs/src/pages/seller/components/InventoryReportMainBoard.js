import MainboardHead from "@/pages/seller/components/MainboardHead";
import InvoiceTable from "@/pages/seller/components/InvoiceTable";

const InventoryReportMainBoard = () => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Inventory Report"} h6Text={"Stock Management"} />
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <InvoiceTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryReportMainBoard;
