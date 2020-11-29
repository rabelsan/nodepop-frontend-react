import { useState } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = event => {
    console.log(event.target.type);
    switch(event.target.type) {
      case ('text'):
      case ('password'):
        setForm({ ...form, [event.target.name]: event.target.value });
        break;
      case ('checkbox'): 
      case ('radiobutton'):
        setForm({ ...form, [event.target.name]: event.target.checked });
        break;
      default:
        break;
    }  
  };

  return [form, handleFormChange];
}

export default useForm;
