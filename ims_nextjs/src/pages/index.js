import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './component/Navbar'
import LandingPage from "@/pages/component/LandingPage";
import {useEffect} from "react";
import {useRouter} from "next/router";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const navigator = useRouter();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        const group = localStorage.getItem("group");
        if (access_token) {
            if (group === "seller") {
                navigator.push('/seller/dashboard')
            }
            else if (group === "manager") {
                navigator.push('/manager/dashboard')
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>
                    Seba Pharmacy
                </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <LandingPage/>
            </main>
        </>
    )
}
