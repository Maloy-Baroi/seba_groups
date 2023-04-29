import productsTableStyle from "@/styles/productTable.module.css";
import {useState, useEffect} from "react";
import {onHandleCartLength} from "@/pages/api/apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getCategoryList, getProductList} from "@/pages/api/app_products";


const ProductsTable = ({searchValue, onHandleCartLength}) => {
    const [products, setProducts] = useState([]);

    const searchOption = () => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase()));
        setProducts(filteredProducts);
    }

    const fetchProduct = async () => {
        const all_pro = await getProductList();
        setProducts(all_pro);
    }

    useEffect(() => {
        if (searchValue) {
            searchOption()
        } else {
            fetchProduct().then(r => console.log(r))
        }
    }, [searchValue])

    const onHandleAddToBox = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var formdata = new FormData();
        formdata.append("product_id", id);
        formdata.append("quantity", "1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api-seller/cart/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result['message'])
                const updatedItems = products.map((item) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1};
                    }
                    else {
                        return item
                    }
                });
                setProducts(updatedItems);
                toast.success('Product added', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000, // Close the toast after 3 seconds
                    hideProgressBar: true, // Hide the progress bar
                });
            })
            .catch(error => console.log('error', error));

    }

    return (
        <>
            <div className={"card " + productsTableStyle.cardBackground}>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <b>All Products</b>
                    </h5>
                    <div className={"mt-3"}>
                        <table className={productsTableStyle.table}>
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Generic</th>
                                <th scope="col">Quantity Left</th>
                                <th scope="col">Shelf</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sell</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((item, index) => (
                                <tr key={item.id}>
                                    <td data-label="Name">
                                        <p className={productsTableStyle.itemName}>{item.name} </p>
                                        <p>({item.unit})</p>
                                        <p className={productsTableStyle.brandName}>
                                            ({item.brand})
                                        </p>
                                    </td>
                                    <td data-label="Generic" style={{
                                        width: "148px",
                                        whiteSpace: "pre-wrap",
                                    }}>
                                        {item.category}
                                    </td>
                                    <td data-label="Quantity Left">{item.quantity}</td>
                                    <td data-label="Brand">
                                        Shelf: {item.shelf.split(", ")[0]} <br/>
                                        Row: {item.shelf.split(", ")[1]} <br/>
                                        Column: {item.shelf.split(", ")[2]}
                                    </td>
                                    <td data-label="Expiry Date">{item.expiry_date}</td>
                                    <td data-label="Price">
                                        <b>
                                            &#2547; {item.minimum_selling_price}
                                        </b>
                                    </td>
                                    <td data-label="Sell">
                                        <div>
                                            <button className={productsTableStyle.AddToSellBtn}
                                                    onClick={() => onHandleAddToBox(item.id)}>Add to Sell
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ProductsTable;
