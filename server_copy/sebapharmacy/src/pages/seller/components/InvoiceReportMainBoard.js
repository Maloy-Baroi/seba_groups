import MainboardHead from "@/pages/seller/components/MainboardHead";
import InvoiceTable from "@/pages/seller/components/InvoiceTable";
import SalesAnalysisCharts from "@/pages/manager/components/SalesAnalysisCharts";

const InvoiceReportMainBoard = () => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Sales List"} h6Text={"Manage Customer Invoice"}/>
            </div>
            <div className={"row mb-4"}>
                <div className={"card"} style={{
                    width: "100%",
                    marginLeft: "10px"
                }}>
                    <div className={"card-body"}>
                        <div className={"p-2"}>
                            <SalesAnalysisCharts />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <InvoiceTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InvoiceReportMainBoard;
