import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import CreateProductForm from "@/pages/seller/components/CreateProductForm";

const CreateProductMainBoard = () => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Product Add"} h6Text={"Create new product"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                                <div className={"col-md-4 " + productStyle.extraWork}>

                                </div>
                            </div>
                        </div>
                        <div>
                            <CreateProductForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProductMainBoard;
