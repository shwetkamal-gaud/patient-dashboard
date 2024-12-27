import axios from "axios";
const auth = btoa(`${process.env.NEXT_PUBLIC_USERNAME}:${process.env.NEXT_PUBLIC_PASSWORD}`);


export const getRequest = async (data:any) => {
    try {
        const response = await axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_URL,
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
};