import { useEffect, useMemo } from 'react';
import { Message, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function MessagePopup({type, text, setMessage}) {
  const toaster = useToaster();

  const message = useMemo(() => (
    <Message showIcon type={type} closable>
      {text}
    </Message>
  ), [type, text]);

  useEffect(()=>{
    toaster.push(message, { placement: 'bottomEnd', duration: 5000 });
    setTimeout(()=>{
        setMessage(prev=>({...prev, showPopup: false}));
    }, 1000)
  }, [toaster, type, message, text, setMessage])

  return (
<></>
  );
};