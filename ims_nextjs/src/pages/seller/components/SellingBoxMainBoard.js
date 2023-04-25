import MainboardHead from "@/pages/seller/components/MainboardHead";
import {useEffect, useState} from "react";
import sellingBoxStyle from "@/styles/sellBox.module.css"

const SellingBoxMainBoard = ({boxItems, handleMinusQuantity, handleAddQuantity}) => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Selling Box"} h6Text={"List of Products in Selling Box"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                            </div>
                        </div>
                        <div>
                            {/*    Here is the Selling Box */}
                            <div>
                                <div className={"row"} style={{
                                    backgroundColor: "rgba(254, 159, 67, 0.08)",
                                    textAlign: "center",
                                    paddingTop: "10px",
                                    color: "#FF9F43"
                                }}>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Name
                                        </p>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Strength
                                        </p>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Quantity
                                        </p>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Quantity x Unit Price
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                {boxItems.map((item) => (
                                    <div key={item.id}>
                                        <div className={"row text-center mb-2 mt-2 " + sellingBoxStyle.tabRow}>
                                            <div className={"col-md-3"}>
                                                <h5>{item.thisProductName}</h5>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <h5>{item.thisProductUnit}</h5>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <h5>
                                                    {
                                                        item.quantity - 1 === 0 ?
                                                            <button className={"btn btn-outline-danger btn-sm"} disabled={true}>
                                                                <i className={"fa fa-minus text-danger"}></i>
                                                            </button>
                                                            : <button className={"btn btn-sm"} onClick={() => handleMinusQuantity(item.id)}>
                                                                <i className={"fa fa-minus"}></i>
                                                            </button>
                                                    }
                                                    &nbsp;
                                                    {item.quantity}
                                                    &nbsp;
                                                    {
                                                        item.existingQuantity === 0 ?
                                                            <button className={"btn btn-outline-danger btn-sm"} disabled={true}>
                                                                <i className={"fa fa-plus"}></i>
                                                            </button>
                                                            : <button className={"btn btn-sm"} onClick={() => handleAddQuantity(item.id)}>
                                                                <i className={"fa fa-plus"}></i>
                                                            </button>
                                                    }
                                                </h5>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <h5>
                                                    &#2547; {item.thisProductPrice * item.quantity}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellingBoxMainBoard
