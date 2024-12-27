import { UnknownAction } from "redux";

export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';
export const GET_ID = 'GET_ID';
export const SET_ID = 'SET_ID'
export interface GetData {
    type: string;
   
}

export type ApiActionTypes = GetData 

export const getData =() : UnknownAction =>{
    
    return(
        
        {
          type: GET_DATA  
        }
    );
}

export const setId = (payload:any): UnknownAction =>{
    return(
        {
            type: SET_DATA,
            payload: payload
        }
    )
}
