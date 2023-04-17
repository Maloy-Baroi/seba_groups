import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import CreateProductMainBoard from "@/pages/seller/components/CreateProductMainBoard";

const CreateProduct = () => {
  return (
      <>
          <Head>
              <title>Seba Pharmacy | Seller | Create New Products</title>
          </Head>
          <main>
              <DashboardNavbar />
              <div className={"row w-100"}>
                  <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                      <Sidebar activeState={"create_products"}/>
                  </div>
                  <div className={"col-md-10"} style={{
                      backgroundColor: "#f8f8f8"
                  }}>
                      <div className={dashboardStyle.content}>
                          <CreateProductMainBoard />
                      </div>
                  </div>
              </div>
          </main>
      </>
  );
}

export default CreateProduct;
