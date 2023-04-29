import {useEffect, useState} from "react";
import {
    getProductList,
    getAlmostExpiryProductsList,
    getExpiredProductsList,
    getCategoryList,
    getSubCategoryList,
    getBrandList, getShelfList
} from "@/pages/api/app_products"
import productFormStyle from "@/styles/productForm.module.css";
import {useRouter} from "next/router";

const CreateProductForm = () => {
    const [p_name, setPName] = useState("")
    const [p_type, setPType] = useState("")
    const [strength, setStrength] = useState("")
    const [purchased_quantity, setPurchasedQuantity] = useState(1)
    const [minimumQuantity, setMinimumQuantity] = useState(1)
    const [minimumPrice, setMinimumPrice] = useState(1)
    const [buyingPrice, setBuyingPrice] = useState(1)
    const [expiry_date, setExpiryDate] = useState('')
    const [shelfNumber, setShelfNumber] = useState("")
    const [description_, setDescription] = useState("")
    const [status, setStatus] = useState(true)
    const [categories, setCategories] = useState([])
    const [productNames, setProductNames] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [allBrand, setBrand] = useState([])
    const [allShelf, setAllShelf] = useState([])
    const [categorySearchText, setCategorySearchText] = useState("");
    const [subCategorySearchText, setSubCategorySearchText] = useState("");
    const [brandSearchText, setBrandSearchText] = useState("");

    const navigator = useRouter()

    useEffect(() => {
        const fetchProductNames = async () => {
            // eslint-disable-next-line @next/next/no-assign-module-variable
            const module = await import("../../../assets/medicines.json");
            setProductNames(module.default);
        };

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

        const fetchShelves = async () => {
            const allShelves = await getShelfList()
            setAllShelf(allShelves);
        }

        fetchProductNames().then(r => true);
        fetchCategories().then(r => true);
        fetchSubCategories().then(r => true);
        fetchBrands().then(r => true);
        fetchShelves().then(r => {
            console.log(allShelf)
        });
    }, []);

    const filteredProductName = productNames.filter((prod) => {
        return prod.product_name.toLowerCase().startsWith(p_name.toLowerCase());
    });

    const filteredCategories = categories.filter((category) => {
        return category.name.toLowerCase().startsWith(categorySearchText.toLowerCase());
    });

    const filteredSubCategories = subCategories.filter((category) => {
        return category.name.toLowerCase().startsWith(subCategorySearchText.toLowerCase());
    });

    const filteredBrand = allBrand.filter((category) => {
        return category.name.toLowerCase().startsWith(brandSearchText.toLowerCase());
    });

    const handleProductNameInputChange = (event) => {
        let prodName = document.getElementById("productNamesID")
        prodName.style.display = "block";
        setPName(event.target.value);
        let specialisedForID = document.getElementById("specialisedForID")
        p_name.length > 0 ? specialisedForID.style.display = "block" : specialisedForID.style.display = "none"
    }

    const handleProductNameSelect = (productName, productStrength, productType, productGen, productCom) => {
        setPName(productName);
        setStrength(productStrength);
        setPType(productType);
        setCategorySearchText(productGen);
        setBrandSearchText(productCom);
        let prodName = document.getElementById("productNamesID")
        prodName.style.display = "none";
    }

    const handleCategoryInputChange = (event) => {
        let generics = document.getElementById("genericID")
        generics.style.display = "block";
        setCategorySearchText(event.target.value);
    }

    const handleCategorySelect = (categoryName) => {
        setCategorySearchText(categoryName);
        let generics = document.getElementById("genericID")
        generics.style.display = "none";
    }


    const handleSubCategoryInputChange = (event) => {
        let specialisedForID = document.getElementById("specialisedForID")
        specialisedForID.style.display = "block";
        setSubCategorySearchText(event.target.value);
    }

    const handleSubCategorySelect = (sub_categoryName) => {
        setSubCategorySearchText(sub_categoryName);
        let specialisedForID = document.getElementById("specialisedForID")
        specialisedForID.style.display = "none";
    }

    const handleBrandInputChange = (event) => {
        let brandID = document.getElementById("brandID")
        brandID.style.display = "block";
        setBrandSearchText(event.target.value);
    }

    const handleBrandSelect = (brandName) => {
        setBrandSearchText(brandName);
        let brandForID = document.getElementById("brandID")
        brandForID.style.display = "none";
    }

    const onHandleSubmitForm = (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)
        const requestBody = {
            product_id: 1001,
            name: p_name,
            type: p_type,
            unit: strength,
            quantity: purchased_quantity,
            minimum_alert_quantity: minimumQuantity,
            minimum_selling_price: minimumPrice,
            expiry_date: expiry_date.toString(),
            shelf: shelfNumber,
            status: status,
            category: categorySearchText,
            sub_category: subCategorySearchText,
            brand: brandSearchText,
            bought_price: buyingPrice,
            description: description_ ? description_ : "No details"
        }
        fetch('http://127.0.0.1:8000/api-product/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data =>
                navigator.push('/seller/products')
            )
            .catch(error => console.error(error))
    }

    const shouldDisplaySpecialisedForID = () => {
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Product Name*</label>
                                <input type={"text"} className={"form-control"}
                                       value={
                                           p_name ?
                                               p_name :
                                               shouldDisplaySpecialisedForID()
                                       }
                                       onChange={handleProductNameInputChange} placeholder={"Product Name"}/>
                                <ul id={"productNamesID"} style={
                                    p_name.length > 0 ?
                                        {display: "block", height: "200px", overflow: "scroll"} :
                                        {display: "none"}
                                }
                                >
                                    {filteredProductName.map((prodName) => (
                                        <li key={prodName.id}
                                            onClick={() => handleProductNameSelect(prodName.product_name, prodName.strength, prodName.type, prodName.generics, prodName.company)}
                                            style={{
                                                cursor: "pointer"
                                            }}>
                                            {prodName.product_name} ({prodName.strength})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Generic Name*</label>
                                <input type={"text"} className={"form-control"} value={categorySearchText}
                                       onChange={handleCategoryInputChange} placeholder={"Generic Name"}/>
                                <ul id={"genericID"} style={
                                    categorySearchText.length > 0 ?
                                        {display: "block", height: "200px", overflow: "scroll"} :
                                        {display: "none"}
                                }
                                >
                                    {filteredCategories.map((category) => (
                                        <li key={category.id} onClick={() => handleCategorySelect(category.name)}
                                            style={{
                                                cursor: "pointer"
                                            }}>
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Medicine For*</label>
                                <input type={"text"} className={"form-control"} value={subCategorySearchText}
                                       onChange={handleSubCategoryInputChange} placeholder={"Specialised"}/>
                                <ul id={"specialisedForID"} style={
                                    subCategorySearchText.length > 0 ?
                                        {display: "block", height: "200px", overflowY: "auto", overflowX: "hidden"} :
                                        {display: "none"}
                                }
                                >
                                    {filteredSubCategories.map((sub_category) => (
                                        <li key={sub_category.id}
                                            onClick={() => handleSubCategorySelect(sub_category.name)} style={{
                                            cursor: "pointer"
                                        }}>
                                            {sub_category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Brand Name*</label>
                                <input type={"text"} className={"form-control"} value={brandSearchText}
                                       onChange={handleBrandInputChange} placeholder={"Brand"}/>
                                <ul id={"brandID"} style={
                                    brandSearchText.length > 0 ?
                                        {display: "block", height: "200px", overflowY: "auto", overflowX: "hidden"} :
                                        {display: "none"}
                                }
                                >
                                    {filteredBrand.map((brand_) => (
                                        <li key={brand_.id} onClick={() => handleBrandSelect(brand_.name)} style={{
                                            cursor: "pointer"
                                        }}>
                                            {brand_.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Type*</label>
                                <select className={"form-control"} placeholder={"table/capsule"} value={p_type}
                                        onChange={e => {
                                            setPType(e.target.value)
                                        }
                                        }>
                                    <option>Select type (capsule/table)</option>
                                    <option>Tablet</option>
                                    <option>Capsule</option>
                                    <option>Syrup</option>
                                    <option>Suppository</option>
                                    <option>Drops</option>
                                    <option>Inhalers</option>
                                    <option>Injections</option>
                                    <option>Implants or patches</option>
                                </select>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Strength*</label>
                                <input type={"text"} className={"form-control"} placeholder={"example: 250mg / 500mg"}
                                       value={strength} onChange={e => setStrength(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Quantity*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Quantity"}
                                       value={purchased_quantity.toString()}
                                       onChange={e => setPurchasedQuantity(parseInt(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Minimum Alert Qty*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Minimum Qty"}
                                       value={minimumQuantity.toString()}
                                       onChange={e => setMinimumQuantity(parseInt(e.target.value))}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Minimum Selling Price*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Price"} min={"0.25"}
                                       step={"0.01"}
                                       value={minimumPrice.toString()}
                                       onChange={e => setMinimumPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Buying Price*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Price"} min={"0.25"}
                                       step={"0.01"}
                                       value={buyingPrice.toString()}
                                       onChange={e => setBuyingPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Expiry Date*</label>
                                <input type="date" className={"form-control"} value={expiry_date}
                                       onChange={(event) => setExpiryDate(event.target.value)}/>

                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Shelf*</label>
                                <select className={"form-control"} value={shelfNumber}
                                        onChange={e => setShelfNumber(e.target.value)}>
                                    <option>select shelf</option>
                                    {allShelf &&
                                        allShelf.map((shelf) => (
                                            <option key={shelf.id}>
                                                Shelf: {shelf.number} Row: {shelf.row} Column: {shelf.column}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-12 col-md-12 col-sm-12"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Description</label>
                                <textarea className={"form-control"} value={description_}
                                          onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <input type={"checkbox"} onClick={e => setStatus(true)}/> <label>status</label>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <button className={"btn me-2 " + productFormStyle.btnSubmit}
                                    onClick={onHandleSubmitForm}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProductForm;
