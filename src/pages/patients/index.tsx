import React, { useEffect, useState } from 'react'
import PatientsList from '../../Components/PatientsList'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getData } from '@/redux/actions/actions'
import DiagnosisHistory from '@/Components/DiagnosisHistory'
import DiagnosticList from '@/Components/DiagnosticList'
import Profile from '@/Components/Profile'
import LabResults from '@/Components/LabResults'

const Patients = () => {
  const router = useRouter()

  const [pId, setPId] = useState<number>(0)
  return (
    <div className='d-flex container-fluid p-4 gap-3'>
      <PatientsList setPId={setPId} pId={pId} />
      <div className='d-flex col-6 flex-column gap-2'>
        <DiagnosisHistory setPId={setPId} pId={pId} />
        <DiagnosticList setPId={setPId} pId={pId} />
      </div>
      <div className='d-flex col-3 flex-column gap-4'>
        <Profile setPId={setPId} pId={pId} />
        <LabResults setPId={setPId} pId={pId} />
      </div>
    </div>

  )
}

export default Patients