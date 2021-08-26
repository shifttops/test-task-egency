import React from "react";

import Currency from "../../Main Page/Currencies/Currency";
import stylesSettings from "../../../Styles/SettingsPage.module.css";

const SettingsCurr = (props) => {

    return (
        <div className={ stylesSettings.myCurrencies__content }>
            { props.currenciesData.map ( currency => {
                return <Currency scale={ currency.Cur_Scale } abbr={ currency.Cur_Abbreviation } id={ currency.Cur_ID }
                                 name={ currency.Cur_Name } rate={ currency.Cur_OfficialRate } date={ currency.Date }
                                 isMyCurrency={ true } isSettingsPage={ true }
                />
            } ) }
        </div>
    )
}

export default SettingsCurr