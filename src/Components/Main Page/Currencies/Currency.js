import React from "react";

import stylesMain from '../../../Styles/MainPage.module.css'

import {Button} from 'antd'
import { connect } from "react-redux";
import { addToMyCurr , deleteFromMyCurr , setMyCurrData } from "../../../redux/dataReducer";

const Currency = (props) => {

    return(
        <div className={stylesMain.currency}>
            <div className={stylesMain.currency__body}>
                <div className={stylesMain.currency__date}>
                    {props.date.slice(8, 10) + '-' + props.date.slice(5, 7) + '-' + props.date.slice(0, 4)}
                </div>
                <div className={stylesMain.currency__abbr}>
                    {props.scale} {props.abbr}:
                </div>
                <div className={stylesMain.currency__rate}>
                    {props.rate}
                </div>
                <div className={stylesMain.currency__name}>
                    ({props.name})
                </div>
            </div>
            {
                props.isSettingsPage &&
                <div className={stylesMain.currency__actins}>
                    { !props.isMyCurrency &&
                    <div className={stylesMain.currency__actins__add}>
                        <Button onClick={() => {
                            props.addToMyCurr(props.id)
                            props.setMyCurrData()
                        }} type="primary" size={"small"}>
                            +
                        </Button>
                    </div>
                    }

                    { props.isMyCurrency &&
                    <div className={stylesMain.currency__actins__delete}>
                        <Button onClick={() => {
                            props.deleteFromMyCurr(props.id)
                            props.setMyCurrData()
                        }} type="primary" danger size={"small"}>
                            -
                        </Button>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default connect(state => {}, {addToMyCurr, deleteFromMyCurr, setMyCurrData})(Currency)