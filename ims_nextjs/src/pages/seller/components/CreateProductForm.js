import {useEffect, useState} from "react";
import {
    getProductList,
    getAlmostExpiryProductsList,
    getExpiredProductsList,
    getCategoryList,
    getSubCategoryList,
    getBrandList
} from "@/pages/api/app_products"

const CreateProductForm = () => {
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brand, setBrand] = useState([])

    useEffect( () => {
        const all_categories = getCategoryList();
        const all_subCategories = getSubCategoryList();
        const all_brands = getBrandList();

        console.log(all_categories)
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <input type={"text"} className={"form-control"}/>
                        </div>
                        <div className={"col-md-3"}>
                            <select className={"form-control"}>
                                <option>
                                    Choose Category
                                </option>
                            </select>
                        </div>
                        <div className={"col-md-3"}>
                            <select className={"form-control"}>
                                <option>
                                    Choose Sub Category
                                </option>
                            </select>
                        </div>
                        <div className={"col-md-3"}>
                            <select className={"form-control"}>
                                <option>
                                    Choose Brand
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProductForm;
