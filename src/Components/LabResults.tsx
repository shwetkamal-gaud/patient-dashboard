import React, { useEffect, useState } from 'react'
import { PatientsProps } from './PatientType'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Data } from '@/redux/reducers/reducers';
import Image from 'next/image';
import dounloadIcon from '../assets/icons/downloadIcon.svg'

const LabResults: React.FC<PatientsProps> = ({ setPId, pId }) => {
  const { data } = useSelector((state: RootState) => state.api);
  const [labResultsList, setLabResultsList] = useState<Data>();
  useEffect(() => {
    setLabResultsList(data[pId])
  }, [data, pId])
  console.log('labResultsList', labResultsList)
  return (
    <div className='d-flex flex-column  card border-0 rounded p-3 bg-white  gap-2' style={{height:'245px'}}>
      <h3 className='pb-3'>Lab Results</h3>
      <ul className='d-flex flex-column gap-2 lab list-group border-0'>
        {
          labResultsList?.lab_results.map((item: string, id: number) => {
            return (
              <li className='d-flex justify-content-between list-group-item border-0 list-group-item-action'>
                {item}
                <Image src={dounloadIcon} alt='' width={17} height={17} />
              </li>
            )
          })
        }
      </ul>

    </div>
  )
}

export default LabResults