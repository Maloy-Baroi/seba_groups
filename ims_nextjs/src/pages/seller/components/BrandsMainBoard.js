import MainboardHead from "@/pages/seller/components/MainboardHead";
import brandStyle from "@/styles/BrandsPage.module.css";
import brandsTableStyle from "@/styles/brandTable.module.css";
import {useEffect, useState} from "react";
import {getBrandList, getCategoryList} from "@/pages/api/app_products";

const BrandsMainBoard = () => {
    const [brands, setBrands] = useState([])
    const [searchItem, setSearchItem] = useState("");

    const fetchBrandList = async () => {
        const allCategories = await getBrandList();
        setBrands(allCategories);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredBrands = brands.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setBrands(filteredBrands);
        }
        else {
            fetchBrandList().then(r => true)
        }
    }

    useEffect(() => {
        fetchBrandList().then(r => true)
    }, [])

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Brand List"} h6Text={"List of Medicine Company"}/>
            </div>
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
                                        <b>All Medicine Company</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={brandsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Generic Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {brands.map((item, index) => (
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

export default BrandsMainBoard;
