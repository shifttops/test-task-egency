import React , { useEffect , useState } from "react";

import stylesMain from '../../Styles/MainPage.module.css'

import CurrenciesDataContainer from "./Currencies/CurrenciesContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { setCurrenciesData } from "../../redux/dataReducer";
import { NavLink } from "react-router-dom";

const MainPage = (props) => {
    let [loading, setLoading] = useState(false)

    useEffect(() => {
       if(props.isLoaded){
           setLoading(false)
       }
    }, [props.isLoaded])

    return(
        <section className={stylesMain.main}>
            <div className={stylesMain.main__body}>
                <div className={stylesMain.pageMain}>
                    <div className={stylesMain.pageMain__content}>
                        <div className={stylesMain.pageMain__label}>
                            Текущие курсы валют
                        </div>
                        <div onClick={() => {props.setCurrenciesData()
                            setLoading(true)}}
                             className={stylesMain.pageMain__update}>
                            <span className={stylesMain.pageMain__update__text}>Обновить</span><FontAwesomeIcon spin={loading} className={stylesMain.pageMain__update__icon} icon={faRedoAlt}/>
                        </div>
                    </div>
                    <CurrenciesDataContainer/>
                    <NavLink to={'/settings'} className={stylesMain.pageMain__settings}>
                        <span className={stylesMain.pageMain__settings__text}>Настройки</span><FontAwesomeIcon className={stylesMain.pageMain__settings__icon} icon={faCog}/>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}



export default connect((state) => ({isLoaded: state.data.isLoaded}), {setCurrenciesData})( MainPage);
