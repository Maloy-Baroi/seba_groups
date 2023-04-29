import MainboardHead from "@/pages/seller/components/MainboardHead";
import InvoiceTable from "@/pages/seller/components/InvoiceTable";

const InvoiceReportMainBoard = () => {
  return (
      <>
          <div className={"row"}>
              <MainboardHead h4Text={"Invoice List"} h6Text={"Manage Customer Invoice"} />
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

export default InvoiceReportMainBoard;
