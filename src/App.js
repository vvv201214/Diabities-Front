import { useState } from 'react';
import Form from './component/form';
import Main from './component/main';

function App() {
  const [selectedPatient, setSelectedPatient] = useState();

  console.log(selectedPatient)
  return (
    <>
    {!selectedPatient ?
    <Main setSelectedPatient={setSelectedPatient} />
    :
    <Form selectedPatient={selectedPatient} />}
    </>
  );
}

export default App;
