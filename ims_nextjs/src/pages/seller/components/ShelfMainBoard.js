import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import ShelfTableStyle from "@/styles/shelfPage.module.css";
import {useEffect, useState} from "react";
import {getShelfList} from "@/pages/api/app_products";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";

const ShelfMainBoard = () => {
    const [shelvesList, setShelvesList] = useState([])

    useEffect(() => {
        getShelfList().then(r => {
            setShelvesList(r);
            console.log(r)
        })
    }, [])

    return (
        <>
            <AddNewHeaderInMainBoard header4Text={"Shelves"} header6Text={"Manage all the shelves"}
                                     addingThing={"Shelf"}/>
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
                            <table className={ShelfTableStyle.table}>
                                <thead>
                                <tr>
                                    <th scope="col">S.N.</th>
                                    <th scope="col">Shelf No.</th>
                                    <th scope="col">Row</th>
                                    <th scope="col">Column</th>
                                </tr>
                                </thead>
                                <tbody>
                                {shelvesList.map((shelf, index) => (
                                    <tr key={shelf.id} style={index % 2 === 0 ?
                                        {
                                            backgroundColor: "rgba(255, 159," + index + 10 + ", 0.78)"
                                        } :
                                        {
                                            backgroundColor: "rgba(255, 159," + index + 15 + ", 0.78)"
                                        }
                                    }>
                                        <td data-label="S.N.">{index}</td>
                                        <td data-label="Shelf">
                                            {shelf.number}
                                        </td>
                                        <td data-label="Row">
                                            {shelf.row}
                                        </td>
                                        <td data-label="Column">
                                            {shelf.column}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShelfMainBoard;
