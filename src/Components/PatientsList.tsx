import React, { useState } from 'react'
import searchIcon from '../assets/icons/searchIcon.svg'
import Image from 'next/image'
import moreHori from "../assets/icons/more_horiz.svg"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { PatientsProps } from './PatientType'


const PatientsList: React.FC<PatientsProps> = ({ setPId, pId }) => {
    const { data } = useSelector((state: RootState) => state.api);
    return (
        <div className="col-3 card rounded  d-flex border-0   ">
            <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center text-align-center">
                    <h5 className="text-align-center">Patients</h5>
                    <Image src={searchIcon} width={17} height={17} alt="search" />
                </div>
            </div>
            <ul  className="list-group card-body px-0 gap-2">
                {data?.map((item: any, id: any) => {
                    return (

                        <li onClick={() => { setPId(id) }} key={id} className={` px-2 mb-2 d-flex align-items-center justify-content-between  ${pId === id ? 'current-p' : ''}`}>
                            <div className="d-flex gap-3">
                                <Image src={`${item.profile_picture}`}
                                    width={50}
                                    height={50}
                                    alt={`${item.name}`}
                                />
                                <div className="d-flex flex-column m-0 p-0">
                                    <p className="mb-0 fw-bold">{item.name}</p>
                                    <p className="mb-0">{`${item.gender}, ${item.age}`}</p>
                                </div>
                            </div>

                            <Image className="me-0" src={moreHori}
                                width={15}
                                height={15}
                                alt="more"
                            />
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default PatientsList