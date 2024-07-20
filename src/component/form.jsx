import { useState } from 'react';
import { addDiabities } from '../apiFunctions';
import MessagePopup from '../messagePopup';
import '../App.css';
import Table from './table';

export default function Form({selectedPatient}) {

    const todaysDate = (new Date())?.toISOString()?.split('T')[0]
    const initialState = {
        diabities: '',
        remark: '',
        patient: selectedPatient?._id,
        isToday: true,
        date: todaysDate
    }
    const [form, setForm] = useState(initialState);

    const [detailSaved, setDetailSaved] = useState([]);

    const [message, setMessage] = useState({
        showPopup: false,
        type: '',
        text: ''
    })
    
    async function handleSubmit(){
        if (!form.diabities) {
            setMessage(prev=>({...prev, showPopup: true}));
            setMessage(prev=>({...prev, type: 'error'}));
            setMessage(prev=>({...prev, text: `कृपया शूगर डालें`}));
            return;
        }

        if(!form.remark){
            setMessage(prev=>({...prev, showPopup: true}));
            setMessage(prev=>({...prev, type: 'error'}));
            setMessage(prev=>({...prev, text: `कृपया टिप्पणी डालें|`}));
            return;
        }
        setDetailSaved(false);
        const data = await addDiabities(form);
        if(data){
            setMessage(prev=>({...prev, showPopup: true}));
            setMessage(prev=>({...prev, type: 'success'}));
            setMessage(prev=>({...prev, text: `ठीक है|`}));
            setForm(initialState);
            setDetailSaved(data.data);
        } else{
            setMessage(prev=>({...prev, showPopup: true}));
            setMessage(prev=>({...prev, type: 'error'}));
            setMessage(prev=>({...prev, text: `कुछ गलत हो गया`}));
            setDetailSaved(true);
        }
    }

    console.log(form.date)


    return (
        <>
            <div className='main-form'>
                <h2>नमस्ते {selectedPatient?.name} !</h2>
                <div className="form">
                    <div className='flex'>
                        <input
                            type="checkbox"
                            id="today" name="today"
                            value="Today"
                            checked={form.isToday}
                            onChange={(e)=>{
                                setForm(prev=>({
                                    ...prev,
                                    isToday: !form.isToday
                                }))
                            }}
                        />
                        <span style={{ fontWeight: 600 }}>आज</span>
                    </div>

                    {!form.isToday &&
                    <input
                        placeholder="तारीख"
                        type='date'
                        value={form.date}
                        onChange={(e) => {
                            setForm(prev => ({
                                ...prev,
                                date: e.target.value
                            }));
                        }}
                    />}
                    <input
                        placeholder="शूगर"
                        type='number'
                        value={form.diabities}
                        onChange={(e) => {
                            setForm(prev => ({
                                ...prev,
                                diabities: e.target.value
                            }));
                        }}
                    />
                    <input
                        placeholder="टिप्पणी"
                        height={'200px'}
                        value={form.remark}
                        onChange={(e) => {
                            setForm(prev => ({
                                ...prev,
                                remark: e.target.value
                            }));
                        }}
                    />
                </div>

                <div className='form-button-div'>
                    <button className='form-button' onClick={handleSubmit} disabled={!detailSaved}>OK</button>
                </div>

                <Table id={selectedPatient?._id} detailSaved={detailSaved} />

            </div>

            {message.showPopup ?
            <MessagePopup type={message?.type} text={message?.text} setMessage={setMessage} />
            :
            <></>}
        </>
    );
}