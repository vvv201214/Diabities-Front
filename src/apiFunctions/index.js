import axios from 'axios';
import { apiUrl } from '../constant';

export async function getUsers(){
    try{
        const data = await axios.get(`${apiUrl}user`);
        return data.data;
    } catch(err){
        console.log(err);
    }
}

export async function getDiabities(id){
    try{
        const data = await axios.get(`${apiUrl}diabities/${id}`);
        return data.data;
    } catch(err){
        console.log(err);
    }
}

export async function addDiabities(obj){
    try{
        const data = await axios.post(`${apiUrl}diabities`, {diabities: obj.diabities, remark: obj.remark, patient: obj.patient}, {
            withCredentials: true
        });
        return data.data;
    } catch(err){
        return false;
    }
}