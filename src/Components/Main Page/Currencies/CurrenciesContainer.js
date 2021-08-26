import React from "react";

import stylesMain from '../../../Styles/MainPage.module.css'

import Currency from "./Currency";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


const CurrenciesData = (props) => {
    let createCurrenciesData = (currenciesData) => {
        return currenciesData.map ( currency => {
                return <Currency scale={currency.Cur_Scale} abbr={currency.Cur_Abbreviation} id={currency.Cur_ID} name={currency.Cur_Name} rate={currency.Cur_OfficialRate} date={currency.Date}/>
            }
        )
    }

    return (
        <div className={ stylesMain.currencies }>
            <div className={ stylesMain.currencies__body }>
                <div className={ stylesMain.currencies__text }>
                    Текушие курсы валют на сегодня (Цена 1 единицы в BYN):
                </div>
                {
                    props.myCurrenciesData.length === 0 && <div className={ stylesMain.currencies__empty}>
                        У вас еще нет ни одной валюты. Вы можете добавить валюту в <NavLink to={'/settings'}>настройках</NavLink>
                    </div>
                }
                { createCurrenciesData(props.myCurrenciesData) }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myCurrenciesData: state.data.myCurrenciesData
    }
}

export default connect ( mapStateToProps ) ( CurrenciesData );
