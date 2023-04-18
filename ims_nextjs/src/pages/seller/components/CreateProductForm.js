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
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getCategoryList();
            setCategories(allCategories);
        };

        const fetchSubCategories = async () => {
            const allSubCategories = await getSubCategoryList();
            setSubCategories(allSubCategories);
        };

        const fetchBrands = async () => {
            const allBrands = await getBrandList();
            setBrand(allBrands);
        };

        fetchCategories().then(r => console.log("Category fetched"));
        fetchSubCategories().then(r => console.log("Sub Category fetched"));
        fetchBrands().then(r => console.log("Brand Fetched"));
    }, []);

    const filteredCategories = categories.filter((category) => {
        return category.name.toLowerCase().startsWith(searchText.toLowerCase());
    });

    const handleInputChange = (event) => {
        let generics = document.getElementById("genericID")
        generics.style.display = "block";
        setSearchText(event.target.value);
    }

    const handleCategorySelect = (categoryName) => {
        setSearchText(categoryName);
        let generics = document.getElementById("genericID")
        generics.style.display = "none";
    }


    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <input type={"text"} className={"form-control"}/>
                        </div>
                        <div className={"col-md-3"}>
                            <input type={"text"} className={"form-control"} value={searchText}
                                   onChange={handleInputChange} placeholder={"Generic Name"}/>
                            <ul id={"genericID"} style={
                                searchText.length > 0 ?
                                    {display: "block", height: "200px", overflow: "scroll"} :
                                    {display: "none"}
                            }
                            >
                                {filteredCategories.map((category) => (
                                    <li key={category.id} onClick={() => handleCategorySelect(category.name)} style={{
                                        cursor: "pointer"
                                    }}>
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
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
