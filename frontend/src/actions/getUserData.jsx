import USER_CATEGS from '../actionTypes/userCategsType.jsx';
import SIGN_USER from '../actionTypes/signUser';
import USER_EXPENSE from '../actionTypes/expenseActionType.jsx';
import CATEG_LIST from '../actionTypes/categListType.jsx';
import DESC_BASE from '../actionTypes/descriptionBaseType.jsx';

export default function getUserData() {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'GET',
            headers: { 
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        }
        fetch(`http://localhost:3001/userdata`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                dispatch([
                {  
                    type: SIGN_USER, 
                    user: data.email
                },
                {  
                    type: USER_CATEGS, 
                    userCategories: data.categories
                },
                {  
                    type: USER_EXPENSE, 
                    userExpenses: data.expenses
                },
                {  
                    type: CATEG_LIST, 
                    categList:  data.categories.map(el=>({name: el.name, id: el._id}))
                },
                {  
                    type: DESC_BASE, 
                    descBase: data.descriptionBase
                }
            ])
            })
            .catch(e => console.log(e))
    }
}