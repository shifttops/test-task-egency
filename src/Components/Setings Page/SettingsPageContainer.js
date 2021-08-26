import React , { useEffect , useState } from "react";

import stylesSettings from '../../Styles/SettingsPage.module.css'
import 'antd/dist/antd.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Currency from "../Main Page/Currencies/Currency";
import { Input , Radio } from 'antd';
import SettingsCurr from "./SettingsCurr/SettinsCurr";
import { sortMyCurr } from "../../redux/dataReducer";

const SettingsPage = (props) => {
    const {Search} = Input;

    let [searched , setSearched] = useState ( '' )
    const [value , setValue] = useState ( 0);

    useEffect ( () => {
        switch (value) {
            case 1: {
                props.sortMyCurr ( props.myCurrenciesData.sort ( (curr1 , curr2) => {
                    if (curr1.Cur_OfficialRate > curr2.Cur_OfficialRate) return -1
                    else if (curr1.Cur_OfficialRate < curr2.Cur_OfficialRate) return 1
                    return 0
                } ))
                break
            }
            case 2: {
                props.sortMyCurr ( props.myCurrenciesData.sort ( (curr1 , curr2) => {
                    if (curr1.Cur_OfficialRate > curr2.Cur_OfficialRate) return 1
                    else if (curr1.Cur_OfficialRate < curr2.Cur_OfficialRate) return -1
                    return 0
                } ))
                break
            }
            default: break;
        }
    } , [value] )


    let createCurrenciesData = (currenciesData , myCurrenciesId) => {
        let currencies = []

        for (let currency of currenciesData) {
            if (myCurrenciesId.indexOf ( currency.Cur_ID ) === -1) {
                currencies.push ( currency )
            }
        }
        return currencies
    }

    const currencies = createCurrenciesData ( props.currenciesData , props.myCurrenciesId )

    return (
        <section className={ stylesSettings.settings }>
            <div className={ stylesSettings.settings__body }>
                <div className={ stylesSettings.pageSettings }>
                    <div className={ stylesSettings.pageSettings__head }>
                        <div className={ stylesSettings.pageSettings__label }>
                            <NavLink to={ '/main' } className={ stylesSettings.pageSettings__label__icon }>
                                <FontAwesomeIcon icon={ faArrowLeft }/><span
                                className={ stylesSettings.pageSettings__label__text }>Назад</span>
                            </NavLink>
                        </div>
                        <div className={ stylesSettings.pageSettings__title }>
                            Настройки
                        </div>
                    </div>
                    <div className={ stylesSettings.pageSettings__content }>
                        <div className={ stylesSettings.pageSettings__content__body }>
                            <div className={ stylesSettings.myCurrencies }>
                                <div className={ stylesSettings.myCurrencies__title }>
                                    Список отслеживаемых валют:
                                </div>
                                <div className={ stylesSettings.myCurrencies__sort }>
                                    <span className={ stylesSettings.myCurrencies__sort__text }>Сортировать по:</span>
                                    <Radio.Group onChange={ (e => setValue ( e.target.value )) } value={ value }>
                                        <Radio value={ 1 }>Убыванию цены</Radio>
                                        <Radio value={ 2 }>Возрастанию цены</Radio>
                                    </Radio.Group>
                                </div>
                                {
                                    props.myCurrenciesData.length ? <SettingsCurr
                                        currenciesData={ props.myCurrenciesData }/> : 'Вы еще не добавили не одной валюты.'
                                }
                            </div>
                            <div className={ stylesSettings.currencies }>
                                <div className={ stylesSettings.currencies__title }>
                                    Остальные валюты:
                                </div>
                                <div className={ stylesSettings.currencies__content }>
                                    <div className={ stylesSettings.currencies__search }>
                                        <Search onSearch={ value => setSearched ( value ) } allowClear enterButton
                                                placeholder={ 'Поиск по буквенному коду...' }/>
                                    </div>
                                    {
                                        searched.length ? currencies.map ( currency => {
                                            if (currency.Cur_Abbreviation.toLowerCase ().includes ( searched.toLowerCase () )) {
                                                return <Currency scale={ currency.Cur_Scale }
                                                                 abbr={ currency.Cur_Abbreviation }
                                                                 id={ currency.Cur_ID }
                                                                 name={ currency.Cur_Name }
                                                                 rate={ currency.Cur_OfficialRate }
                                                                 date={ currency.Date }
                                                                 isMyCurrency={ false } isSettingsPage={ true }

                                                />
                                            }
                                        } ) : currencies.map ( currency => {
                                            return <Currency scale={ currency.Cur_Scale }
                                                             abbr={ currency.Cur_Abbreviation } id={ currency.Cur_ID }
                                                             name={ currency.Cur_Name }
                                                             rate={ currency.Cur_OfficialRate } date={ currency.Date }
                                                             isMyCurrency={ false } isSettingsPage={ true }
                                            />
                                        } )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default connect ( state => ({
    currenciesData: state.data.currenciesData ,
    myCurrenciesData: state.data.myCurrenciesData ,
    myCurrenciesId: state.data.myCurrenciesId ,
}) , {sortMyCurr} ) ( SettingsPage );