import { Data } from '@/redux/reducers/reducers';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { PatientsProps } from './PatientType';


const DiagnosticList: React.FC<PatientsProps> = ({ setPId, pId }) => {
    const { data } = useSelector((state: RootState) => state.api);
    const [diagnosticList, setDiagnosticList] = useState<Data>();
    useEffect(() => {
        setDiagnosticList(data[pId])
    }, [data, pId])
    console.log('diagnosticList', diagnosticList?.diagnostic_list)
    return (
        <div className=' d-flex flex-column card border-0 rounded p-3 bg-white  gap-2' style={{height:'380px'}}>
            <h3 className='pb-3'>Diagnostic List</h3>
            <div className='d-flex bg-light  p-2 col-12 header align-items-center justify-content-start ' style={{ borderRadius: '20px' }}>
                <span className='col-3'>Problem /Diagnosis</span>
                <span className='col-6'>Description</span>
                <span className='col-3'>Status</span>
            </div>

            <div className='table-body card-body px-0' >
                {diagnosticList?.diagnostic_list.map((item: any, id: number) => (
                    <div className='d-flex border-1 t-body align-items-center justify-content-center p-1 col-12 gap-1' key={id}>
                        <span className='col-3'>{item.name}</span>
                        <span className='col-6'>{item.description}</span>
                        <span className='col-3'>{item.status}</span>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default DiagnosticList