import React, { useEffect } from 'react'
import homeIcon from "../assets/icons/home.svg"
import messageIcon from "../assets/icons/messageIcon.svg"
import groupIcon from "../assets/icons/groupIcon.svg"
import calenderIcon from "../assets/icons/calenderIcon.svg"
import transactionIcon from "../assets/icons/transactionIcon.svg"
import doctorImage from "../assets/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
import settingIcon from "../assets/icons/settingIcon.svg"
import moreIcon from "../assets/icons/moreIcon.svg"
import logo from "../assets/icons/TestLogo.svg"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getData } from '@/redux/actions/actions'
const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const navItems = [
        {
            name: 'OverView',
            icon: homeIcon,
            path: "/",
        },
        {
            name: 'Patients',
            icon: groupIcon,
            path: "/patients",
        },
        {
            name: 'Schedule',
            icon: calenderIcon,
            path: '/schedule'
        },
        {
            name: 'Message',
            icon: messageIcon,
            path: '/message'
        },
        {
            name: 'Transactions',
            icon: transactionIcon,
            path: '/transactions'
        },

    ]
    const onGetData = () => {
        if (router.pathname === '/patients') {
            dispatch(getData())
        }
    }
    useEffect(() => {
        onGetData()
    }, [router])
    return (
        <nav className="navbar navbar-expand-xl bg-white py-0" style={{ borderRadius: '70px' }}>
            <div className="container-fluid col-12">
                <a className="navbar-brand fw-bolder col-3" href="#"><Image src={logo} alt='logo' /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="col-8 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="col-8 navbar-nav me-0 mb-2 mb-lg-0 gap-3">
                        {navItems.map((item: any, id: number) => {
                            return (
                                <li key={id} className={`nav-item d-flex align-items-center px-2  ${router.pathname === item.path ? 'current' : ''} `}>
                                    <Image src={item.icon} width={15} height={15} alt="home_icon" />
                                    <a className="nav-link" aria-current="page" href={item.path}>{item.name}</a>
                                </li>
                            )
                        })}


                    </ul>
                    <div className="col-4 d-flex align-items-center justify-content-end gap-2">
                        <Image src={doctorImage} width={40} height={40} alt="doctor" />
                        <div className="d-flex flex-column m-0 p-0">
                            <p className="mb-0 fw-bold">Dr. Jose Simmons</p>
                            <p className="mb-0">General Practitioner</p>
                        </div>
                        <div className="vr"></div>
                        <Image src={settingIcon} width={20} height={20} alt="settings" />
                        <Image src={moreIcon} width={20} height={20} alt="more" />
                    </div>

                </div>
            </div>

        </nav>

    )
}

export default Navbar