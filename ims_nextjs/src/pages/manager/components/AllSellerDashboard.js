import MainboardHead from "@/pages/seller/components/MainboardHead";
import brandStyle from "@/styles/BrandsPage.module.css";
import brandsTableStyle from "@/styles/brandTable.module.css";
import {getBrandList, getSellerList} from "@/pages/api/app_products";
import {useEffect, useState} from "react";

const AllSellerDashboard = () => {
    const [sellerList, setSellerList] = useState([])
    const [searchItem, setSearchItem] = useState("");

    const fetchSellerList = async () => {
        const allSeller = await getSellerList();
        setSellerList(allSeller);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredSeller = sellerList.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setSellerList(filteredSeller);
        }
        else {
            fetchSellerList().then(r => true)
        }
    }

    useEffect(() => {
        fetchSellerList().then(r => true)
    }, [])

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Seller List"} h6Text={"List of all the salesman"}/>
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
                                        <b>All Salesman General Information</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={brandsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {sellerList.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td data-label="S.N">{index+1}</td>
                                                    <td data-label="Name">{item.first_name} {item.last_name}</td>
                                                    <td data-label="email">{item.email}</td>
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

export default AllSellerDashboard;
