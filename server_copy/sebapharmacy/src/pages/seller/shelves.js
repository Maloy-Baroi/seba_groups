import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import CreateProductMainBoard from "@/pages/seller/components/CreateProductMainBoard";
import ShelfMainBoard from "@/pages/seller/components/ShelfMainBoard";

const Shelves = () => {
  return (
      <>
          <Head>
              <title>Seba Pharmacy | Seller | Create New Products</title>
          </Head>
          <main>
              <DashboardNavbar />
              <div className={"row w-100"}>
                  <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                      <Sidebar activeState={"shelves"}/>
                  </div>
                  <div className={"col-md-10"} style={{
                      backgroundColor: "#f8f8f8"
                  }}>
                      <div className={dashboardStyle.content}>
                          <ShelfMainBoard />
                      </div>
                  </div>
              </div>
          </main>
      </>
  );
}

export default Shelves;
