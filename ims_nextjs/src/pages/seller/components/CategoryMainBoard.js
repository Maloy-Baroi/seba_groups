import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import CreateProductForm from "@/pages/seller/components/CreateProductForm";
import productsTableStyle from "@/styles/productTable.module.css";
import {useEffect, useState} from "react";
import {getCategoryList} from "@/pages/api/app_products";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";

const CategoryMainBoard = () => {
    const [categories, setCategories] = useState([])
    const [searchItem, setSearchItem] = useState("");

    const fetchCategories = async () => {
        const allCategories = await getCategoryList();
        setCategories(allCategories);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setCategories(filteredCategories);
        } else {
            fetchCategories().then(r => true)
        }
    }

    useEffect(() => {
        fetchCategories().then(r => true)
    }, [])

    return (
        <>
            <AddNewHeaderInMainBoard header6Text={"List of Generic Names"} header4Text={"Generic Name List"}
                                     addingThing={"Add new category"}/>
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
                            <input value={searchItem} onChange={searchOption}
                                   className={"form-control w-50 mb-3"} placeholder={"search "}/>
                        </div>
                        <div>
                            <div className={"card " + productsTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Generic</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={productsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Generic Name</th>
                                                <th scope="col">Pharmacology</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {categories.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td data-label="Quantity Left">{index + 1}</td>
                                                    <td data-label="Quantity Left">{item.name}</td>
                                                    <td data-label="Quantity Left">{item.Pharmacology}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryMainBoard;
