import { currencyAPI } from "../api/server";

const initialState = {
    currenciesData: null ,
    myCurrenciesId: [449 , 431 , 451 , 452 , 456] ,
    myCurrenciesData: null ,
    isLoaded: false ,
}

const SET_CURR_DATA = 'data/SET_CURR_DATA'
const SET_MY_CURR_DATA = 'data/SET_MY_CURR_DATA'
const TOGGLE_IS_LOADED = 'data/TOGGLE_IS_LOADED'
const ADD_TO_MY = 'data/ADD_TO_MY'
const DELETE_FROM_MY = 'data/DELETE_FROM_MY'
const SORT_MY_CURR = 'data/SORT_MY_CURR'

const dataReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_CURR_DATA: {
            return {
                ...state ,
                currenciesData: action.payload
            }
        }
        case SET_MY_CURR_DATA: {
            return {
                ...state ,
                myCurrenciesData: state.currenciesData.map ( currency => {
                        for (const id of state.myCurrenciesId) {
                            if (currency.Cur_ID === id) {
                                return {...currency}
                            }
                        }
                    }
                ).filter(currency => currency !== undefined)
            }
        }
        case TOGGLE_IS_LOADED: {
            return {
                ...state ,
                isLoaded: action.payload
            }
        }
        case ADD_TO_MY: {
            return{
                ...state,
                myCurrenciesId: [...state.myCurrenciesId, action.payload]
            }
        }
        case DELETE_FROM_MY:{
            return{
                ...state,
                myCurrenciesId: state.myCurrenciesId.filter(myCurrencyId => myCurrencyId !== action.payload)
            }
        }
        case SORT_MY_CURR: {
                return{
                    ...state,
                    myCurrenciesData: action.payload
                }
        }
        default:
            return state
    }
}

const setCurrData = (currencyData) => ({type: SET_CURR_DATA , payload: currencyData})
export const setMyCurrData = () => ({type: SET_MY_CURR_DATA})
export const addToMyCurr = (id) => ({type: ADD_TO_MY, payload: id})
export const deleteFromMyCurr= (id) => ({type: DELETE_FROM_MY, payload: id})
export const sortMyCurr= (data) => ({type: SORT_MY_CURR, payload: data})
const toggleIsLoaded = (isLoaded) => ({type: TOGGLE_IS_LOADED , payload: isLoaded})

export const setCurrenciesData = () => async (dispatch) => {
    dispatch ( toggleIsLoaded ( false ) )

    let response = await currencyAPI.getCurrencies ()
    if (response.status === 200) {
        dispatch ( setCurrData ( response.data ) )
        dispatch(setMyCurrData())
        dispatch ( toggleIsLoaded ( true ) )
    }

}
export default dataReducer