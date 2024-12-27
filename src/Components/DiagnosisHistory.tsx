import { RootState } from '@/redux/store';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import expandIcon from '../assets/icons/expand.svg'
import arrowUP from '../assets/icons/ArrowUp.svg'
import arrowDown from '../assets/icons/ArrowDown.svg'
import respiratoryRate from '../assets/icons/respiratory rate.svg'
import temperature from '../assets/icons/temperature.svg'
import heartRate from '../assets/icons/HeartBPM.svg'
import { PatientsProps } from './PatientType';


const DiagnosisHistory: React.FC<PatientsProps> = ({ setPId, pId }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const { data } = useSelector((state: RootState) => state.api);

    const diagnosisHistory = data[pId]?.diagnosis_history;

    const labels = diagnosisHistory?.map((row) => `${row.month.slice(0, 3)}, ${row.year}`).reverse().slice(0, 6);

    //systolic
    const systolicData = diagnosisHistory?.map((row) => row.blood_pressure.systolic.value).reverse().slice(0, 6) ?? [];
    const systolicLevels = diagnosisHistory?.map((row) => row.blood_pressure.systolic.levels).reverse().slice(0, 6) ?? [];
    const maxSystolic = Math.max(...systolicData)
    const systolicLevel = systolicLevels[systolicData.indexOf(maxSystolic)]

    //diastolic
    const diastolicData = diagnosisHistory?.map((row) => row.blood_pressure.diastolic.value).reverse().slice(0, 6) ?? [];
    const diastolicLevels = diagnosisHistory?.map((row) => row.blood_pressure.diastolic.levels).reverse().slice(0, 6) ?? [];
    const maxDiastolic = Math.max(...diastolicData)
    const diastolicLevel = diastolicLevels[diastolicData.indexOf(maxDiastolic)]

    //respiratory
    const respiratoryDataValue = diagnosisHistory?.map((row) => row.respiratory_rate.value).slice(0, 6) ?? []
    const respiratoryDataLevel = diagnosisHistory?.map((row) => row.respiratory_rate.levels) ?? []
    const maxRespiratory = Math.max(...respiratoryDataValue)
    const respiratoryLevel = respiratoryDataLevel[respiratoryDataValue.indexOf(maxRespiratory)]

    //temaperature
    const temperatureValue = diagnosisHistory?.map((row) => row.temperature.value).slice(0, 6) ?? []
    const maxTemperature = Math.max(...temperatureValue)
    const temperatureLevels = diagnosisHistory?.map((row) => row.respiratory_rate.levels) ?? []
    const temperatureLevel = temperatureLevels[temperatureValue.indexOf(maxTemperature)]

    //heartRate
    const heartRateValue = diagnosisHistory?.map((row) => row.heart_rate.value).slice(0, 6) ?? []
    const maxHartRate = Math.max(...heartRateValue)
    const heartRateLevels = diagnosisHistory?.map((row) => row.heart_rate.levels) ?? []
    const heartRateLevel = heartRateLevels[heartRateValue.indexOf(maxHartRate)]

    const sysDia = [
        {
            name: 'Systolic',
            circleColor: '#E66FD2',
            maxValue: maxSystolic,
            level: systolicLevel,
            hr: true
        },
        {
            name: 'Diastolic',
            circleColor: '#8C6FE6',
            maxValue: maxDiastolic,
            level: diastolicLevel,
            hr: false
        }

    ]

    const cardValue = [
        {
            name: 'Respiratory Rate',
            cardColor: '#E0F3FA',
            maxValue: maxRespiratory,
            level: respiratoryLevel,
            image: respiratoryRate
        },
        {
            name: 'Temperature',
            cardColor: '#FFE6E9',
            maxValue: maxTemperature,
            level: temperatureLevel,
            image: temperature
        },
        {
            name: 'Heart Rate',
            cardColor: '#FFE6F1',
            maxValue: maxHartRate,
            level: heartRateLevel,
            image: heartRate
        }
    ]

    useEffect(() => {


        Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Systolic',
                                data: systolicData,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 2,
                            },
                            {
                                label: 'Diastolic',
                                data: diastolicData,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },

                        },
                    },
                });
            }

        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [pId, data]);

    return (
        <div className='d-flex flex-column rounded  p-3 card border-0 flex-wrap gap-2'>
            <h3 className='pb-2'>Diagnosis History</h3>
            <div className='d-flex  p-2 gap-2 rounded' style={{ backgroundColor: '#F4F0FE' }}>
                <div className='d-flex flex-column col-8'>
                    <div className='d-flex justify-content-between'>
                        <h5>Blood Pressure</h5>
                        <div className='d-flex justify-content-center align-items-center'><span>{`last 6 months`}</span>
                            <Image className='ms-2' src={expandIcon} width={10} height={10} alt='expand' />
                        </div>
                    </div>
                    <canvas ref={chartRef}></canvas>
                </div>
                <div className='d-flex flex-column col-4 p-2 gap-2'>
                    {sysDia.map((item: any, id: number) => {
                        return (
                            <div key={id} className='d-flex flex-column gap-2'>
                                <div className='d-flex align-items-center  gap-2'>
                                    <div style={{ backgroundColor: item.circleColor, height: '15px', width: '15px', borderRadius: '50%' }}></div>
                                    <p className='text-align-center mb-0 fw-bold'>{item.name}</p>
                                </div>
                                <h4 className='m-0'>{item.maxValue}</h4>
                                <div className='d-flex align-items-center  gap-2'>
                                    {item.level !== "Normal" ? <Image className='ms-2' src={item.level === "Higher than Average" ? arrowUP : arrowDown} width={10} height={10} alt='arrow' /> : ''}
                                    <p className='text-align-center mb-0'>{item.level}</p>
                                </div>
                                {item.hr ? <hr /> : ''}
                            </div>
                        )
                    })}


                </div>
            </div>
            <div className='d-flex gap-2 pe-3'>
                {cardValue.map((item: any, id: number) => {
                    return (
                        <div key={id} className='col-4 d-flex flex-column flex-wrap rounded p-2 gap-2' style={{ backgroundColor: item.cardColor }}>
                            <Image src={item.image} width={70} height={70} alt='respiratoryRate' />
                            <p className='mb-0'>{item.name}</p>
                            <h3>{item.maxValue}</h3>
                            {item.level !== "Normal" ? <Image className='' src={item.level === "Higher than Average" ? arrowUP : arrowDown} width={10} height={10} alt='arrow' /> : ''}
                            <p className='text-align-center mb-0'>{item.level}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default DiagnosisHistory;
