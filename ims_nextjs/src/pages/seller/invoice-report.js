import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import CreateProductMainBoard from "@/pages/seller/components/CreateProductMainBoard";
import InvoiceReportMainBoard from "@/pages/seller/components/InvoiceReportMainBoard";

const InvoiceReport = () => {
    return (
        <>
            <OnlyHead page={"Invoice Report"}/>
            <main>
                <DashboardNavbar/>
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"invoice-report"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <InvoiceReportMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InvoiceReport;
