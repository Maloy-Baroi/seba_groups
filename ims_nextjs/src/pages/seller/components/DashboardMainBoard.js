import MainboardCard from "@/pages/seller/components/MainboardCard";
import DashboardTable from "@/pages/seller/components/DashboardTable";

const DashboardMainBoard = () => {
  return (
      <>
          <div className={"m-2 p-2"}>
              <div className={"row"}>
                  <div className={"col-lg-3 col-md-6 col-sm-12"}>
                      <MainboardCard bgColor={"#FF9F43"} imageSrc={"fa-briefcase"} altText={"Icon 1"} totalAmount={"0"} titleText={"Total Completed Orders"} />
                  </div>
                  <div className={"col-lg-3 col-md-6 col-sm-12"}>
                      <MainboardCard bgColor={"#00CFE8"} imageSrc={"fa-dollar"} altText={"Icon 1"} totalAmount={"0"} titleText={"Total Selling Amount"} />
                  </div>
                  <div className={"col-lg-3 col-md-6 col-sm-12"}>
                      <MainboardCard bgColor={"#1B2850"} imageSrc={"fa-download"} altText={"Icon 1"} totalAmount={"0"} titleText={"Total Sells on Credit"} />
                  </div>
                  <div className={"col-lg-3 col-md-6 col-sm-12"}>
                      <MainboardCard bgColor={"#28C76F"} imageSrc={"fa-divide"} altText={"Icon 1"} totalAmount={"0"} titleText={"Your Average Performance"} />
                  </div>
              </div>
              <div className={"row p-3"}>
                  <DashboardTable />
              </div>
          </div>
      </>
  );
}

export default DashboardMainBoard;
