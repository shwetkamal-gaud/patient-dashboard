import React, { useEffect, useState } from 'react'
import { PatientsProps } from './PatientType'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Data } from '@/redux/reducers/reducers';
import Image from 'next/image';
import calender from '../assets/icons/BirthIcon.svg'
import FemaleIcon from '../assets/icons/FemaleIcon.svg'
import maleIcon from '../assets/icons/male.svg'



const Profile: React.FC<PatientsProps> = ({ setPId, pId }) => {
    const { data } = useSelector((state: RootState) => state.api);
    const [profileData, setProfileData] = useState<Data>()
    useEffect(() => {
        setProfileData(data[pId])
    }, [data, pId])
    console.log("profile", profileData, data[pId], pId)

    return (
        <div className='col-12 d-flex card border-0 flex-column justify-content-center rounded p-4 bg-white flex-wrap' style={{ gap: '2rem' }}>
            <div className='d-flex flex-column align-items-center gap-4 '>
                {profileData && <Image src={profileData.profile_picture} alt='profile_image' width={140} height={140} />}
                <h4 className='text-align-center'>{profileData?.name}</h4>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Image src={calender} alt='date' width={42} height={42} />
                <div className='d-flex flex-column'>
                    <span>Date Of Birth</span>
                    <span className='fw-bolder'>{profileData?.date_of_birth}</span>
                </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Image src={profileData?.gender === "Female" ? FemaleIcon : maleIcon} alt='date' width={42} height={42} />
                <div className='d-flex flex-column'>
                    <span>Gender</span>
                    <span className='fw-bolder'>{profileData?.gender}</span>
                </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Image src={calender} alt='date' width={42} height={42} />
                <div className='d-flex flex-column'>
                    <span>Contact Info.</span>
                    <span className='fw-bolder'>{profileData?.phone_number}</span>
                </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Image src={calender} alt='date' width={42} height={42} />
                <div className='d-flex flex-column'>
                    <span>Emergency Contacts</span>
                    <span className='fw-bolder'>{profileData?.emergency_contact}</span>
                </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <Image src={calender} alt='date' width={42} height={42} />
                <div className='d-flex flex-column'>
                    <span>Insurance Provide</span>
                    <span className='fw-bolder'>{profileData?.insurance_type}</span>
                </div>
            </div>
            <button className='btn mx-auto' style={{ backgroundColor: '#01F0D0', borderRadius: '41px' }}>Show All Information</button>
        </div>
    )
}

export default Profile