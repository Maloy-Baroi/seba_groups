import MainboardHead from "@/pages/seller/components/MainboardHead";
import brandStyle from "@/styles/BrandsPage.module.css";
import brandsTableStyle from "@/styles/brandTable.module.css";
import {useEffect, useState} from "react";
import {getBrandList, getSubCategoryList} from "@/pages/api/app_products";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";

const SubCategoryMainBoard = () => {
    const [subCategory, setSubCategory] = useState([])
    const [searchItem, setSearchItem] = useState("");

    const fetchSubCategoryList = async () => {
        const allSubCategory = await getSubCategoryList();
        setSubCategory(allSubCategory);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredSubCategory = subCategory.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setSubCategory(filteredSubCategory);
        }
        else {
            fetchSubCategoryList().then(r => true)
        }
    }

    useEffect(() => {
        fetchSubCategoryList().then(r => true)
    }, [])

    return (
        <>
            <AddNewHeaderInMainBoard header6Text={"List of Sub Category"} header4Text={"Specialized List"}
                                     addingThing={"Add new sub-category"}/>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                                <div className={"col-md-4 " + brandStyle.extraWork}>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input value={searchItem} onChange={searchOption}
                                   className={"form-control w-50 mb-3"} placeholder={"search "}/>
                        </div>
                        <div>
                            <div className={"card " + brandsTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Sub-Category</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={brandsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Specialized For</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {subCategory.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td data-label="Quantity Left">{index+1}</td>
                                                    <td data-label="Quantity Left">{item.name}</td>
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

export default SubCategoryMainBoard;
