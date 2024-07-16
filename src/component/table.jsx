import { useEffect, useState, memo } from 'react';
import { getDiabities } from '../apiFunctions';
import '../App.css';
import moment from 'moment';


function Table({id, detailSaved}){

    const [data, setData] = useState([]);

    useEffect(()=>{
        getDiabities(id).then((res)=>{
            setData(res.data)
        })
    }, [detailSaved, id])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>तारीख</th>
                        <th>शूगर</th>
                        <th>टिप्पणी</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((elem) => {
                        return (
                            <tr key={elem?._id}>
                                <td>{moment(elem.date).format('DD MMM YY')}</td>
                                <td>{elem.diabities}</td>
                                <td>{elem.remark.length>20 ? `${elem.remark.slice(0, 20)}...` : elem.remark}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
    
}

export default memo(Table);