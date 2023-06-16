import React, {useState} from 'react'
import Image from 'next/future/image'
import s from './Header.module.css'
import logo from '/assets/stormlands-logo.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import PersonCircle from '@components/icons/PersonCircle'
import Navbar from '@components/ui/Navbar/Navbar'
import Menu from '@components/icons/Menu'
import {useRouter} from 'next/router'
import {useUser} from "src/context/AuthContext";

function Header({signOut}: { signOut: any }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const {user, setUser} = useUser();
    const router = useRouter();

    return (
        <header className={s.header}>
            <div className="flex overflow-y-auto px-3 h-full justify-between items-center ">
                <div
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Image
                        className="p-2 cursor-pointer"
                        src={"/assets/stormlands-logo.png"}
                        height={200}
                        width={150}
                        alt="no image"
                    ></Image>
                </div>
                <Menu
                    onClick={() => setIsNavOpen((prev) => !prev)}
                    className=" md:hidden "
                    height={32}
                ></Menu>
                <div className="md:flex cursor-pointer p-2 hidden items-center">
                    <PersonCircle w={"32"} h={"32"}></PersonCircle>
                    <span className="m-2">{user?.username}</span>
                    <span className="ml-4 " onClick={signOut}>
            Log Out
          </span>
                </div>
            </div>
            {/* Mobile nav */}
            <div
                className={`md:hidden cursor-pointer mb-5 w-full flex  justify-end items-center ${
                    isNavOpen ? "block" : "hidden"
                }`}
            >
                <PersonCircle w={"32"} h={"32"}></PersonCircle>
                <span>{user?.username}</span>
                <button className="ml-4 " onClick={signOut}>
                    Log Out
                </button>
            </div>
        </header>
    );
}

export default Header