import { useState } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = event => {
    switch(event.target.type) {
      case ('text'):
      case ('password'):
      case ('radio'):  
        setForm({ ...form, [event.target.name]: event.target.value });
        break;
      case ('checkbox'): 
        setForm({ ...form, [event.target.name]: event.target.checked });
        break;
      default:
        break;
    }  
  };

  return [form, handleFormChange];
}

export default useForm;
