import { SET_DATA, SET_ID } from '../actions/actions';

export interface BloodPressure {
    diastolic: { value: number, levels: string }
    systolic: { value: number, levels: string }
}

interface DiagnosticList {
    name: string;
    description: string

}
export interface DiagnosisHistories {
    month: string;
    year: number;
    blood_pressure: BloodPressure;
    heart_rate: { value: number, levels: string };
    respiratory_rate: { value: number, levels: string }
    temperature: { value: number, levels: string }
}

export interface Data {
    name: string;
    age: number;
    date_of_birth: string;
    diagnosis_history: DiagnosisHistories[];
    diagnostic_list: DiagnosticList[];
    emergency_contact: string;
    gender: string;
    insurance_type: string;
    lab_results: string[];
    phone_number: string
    profile_picture: string
}
interface initialState {
    data: Data[];
    Id: number
}

const initialState: initialState = {
    data: [],
    Id: 0
};

export const mainReducer = (state = initialState, action: any): initialState => {

    switch (action.type) {

        case SET_DATA:
            return { ...state, data: action.payload };

        case SET_ID:
            console.log("state",state, action)
            return { ...state, Id: action.payload }
        default:
            return state;
    }
};
