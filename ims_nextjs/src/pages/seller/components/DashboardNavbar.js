import navStyle from "../../../styles/dashboard.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";

const DashboardNavbar = () => {
    const [cartLength, setCartLength] = useState(0);
    const onHandleCartLength = () => {
        const sellcart = JSON.parse(localStorage.getItem('sellcard') || '[]');
        setCartLength(sellcart.length);
    }

    useEffect(() => {
        onHandleCartLength();
    }, [])

    return (
        <>
            <nav className={"navbar navbar-expand-lg bg-white " + navStyle.bottomShadow}>
                <div className={"container-fluid " + navStyle.navContainer}>
                    <Link className="navbar-brand" href={"/"}>Seba Pharmacy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link active" aria-current="page" href={"/seller/selling-box/"}>
                                    <i className={"fa fa-shopping-cart"}>
                                        <sup className={"m-1 " + navStyle.supText}>
                                            {cartLength}
                                        </sup>
                                    </i>
                                </Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link active" aria-current="page" href={"/"}>
                                    <i className={"far fa-message"}>
                                        <sup className={"m-1 " + navStyle.supText}>2</sup>
                                    </i>
                                </Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link" href={"/"}>
                                    <i className={"far fa-bell"}>
                                        <sup className={"m-1 " + navStyle.supText}>1</sup>
                                    </i>
                                </Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link" href={"/"}>Salesman</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default DashboardNavbar;
