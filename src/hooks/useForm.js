import { useState } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = event => {
    console.log(event);
    switch(event.type) {
      case ('button'):
        setForm(state => ({
          form: { ...form, [event.target.name]: event.target.value },
        }));
        break;
      case ('checkbox'):  
        setForm(state => ({
          form: { ...form, [event.target.name]: event.target.checked },
        }));
        break;
      default:
        break;
    }  
  };

  return [form, handleFormChange];
}

export default useForm;
