import * as yup from 'yup';

const validation = yup.object().shape({
    title: yup.string().required("Texto é obrigatório")
                       .min(1,"mínimo 1 carácter")
                       .max(100, "máximo 100 caracteres"),
                       

    description: yup.string().required("Descrição é obrigatória")
                             .min(1,"mínimo 5 caracters")
                             .max(1024, "máximo 1024 caracteres")
                             
  });

export default validation;  
