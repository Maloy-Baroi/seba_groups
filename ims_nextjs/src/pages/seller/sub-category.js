import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import SubCategoryMainBoard from "@/pages/seller/components/SubCategoryMainBoard";

const SubCategory = () => {
    return (
        <>
            <OnlyHead page={"sub-category"} />
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"sub-category"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <SubCategoryMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SubCategory;
