import { AUTH } from '../variables/actiontypes';
import * as api from '../apis/index';
import {useHistory} from 'react-router-dom';

// export const signup = (form)=> (
//   {
//     type: AUTH,
//     payload:form

//   }
// )

export const signup = (formData) => async (dispatch) => {
    
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });

    
  } catch (error) {
    console.log(error);
  }
};
