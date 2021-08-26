import React , { useEffect , useState } from "react";

import './App.css';
import { Redirect , Route } from "react-router";

import MainPageContainer from "./Components/Main Page/MainPageContainer";

import stylesCommon from './Styles/Common.module.css'
import { connect } from "react-redux";
import { setCurrenciesData } from "./redux/dataReducer";
import Preloader from "./Components/Common/Preloader";
import SettingsPageContainer from "./Components/Setings Page/SettingsPageContainer";

const App = (props) => {
    let [counter, setCounter] = useState(0)

    useEffect ( () => {
        props.setCurrenciesData ()
    } , [] )

    if(counter === 0 ) {
        if (!props.isLoaded) return <Preloader/>
        setCounter(1)
    }

    return (
        <main className={ stylesCommon.wrapper }>
            <div className={ stylesCommon.page }>
                <div className={ stylesCommon.page__body + ' ' + stylesCommon.container }>
                    <Redirect from={ '/' } to={ '/main' }/>
                    <Route path={ '/main' } render={ () => <MainPageContainer/> }/>
                    <Route exact={true} path={ '/settings' } render={() => <SettingsPageContainer/>}/>
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoaded: state.data.isLoaded
    }
}

export default connect ( mapStateToProps , {setCurrenciesData} ) ( App );
