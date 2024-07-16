import { useEffect, useState } from 'react';
import { getUsers } from '../apiFunctions';
import '../App.css';

export default function Main({setSelectedPatient}) {

    const [patient, setPatient] = useState([]);

    useEffect(() => {
        getUsers().then((res) => {
            setPatient(res.data);
        })
    }, [])

    return (
        <>
        <h2 className='heading'>कृपया नाम चुनें</h2>

        <div className="patient-list">
            {patient.map((elem) => {
                return (
                    <div key={elem?._id} className="patient-item" onClick={()=>{setSelectedPatient(elem)}}>
                        <span className="patient-icon">{elem?.gender === 'female' ? "🙋🏻‍♀️" : "🙋🏻‍♂️"}</span>
                        <span className="patient-name">{elem?.name}</span>
                    </div>
                );
            })}
        </div>
        </>
    )
}