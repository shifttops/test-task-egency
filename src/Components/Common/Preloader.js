import React from 'react';

import preloadImage from '../../assets/images/preloader.svg'
/*import preloaderStyles from '../../../Styles/Preloader.module.css'*/
// className={preloaderStyles.preloader}

class Preloader extends React.Component{
    render() {
        return(
            <div>
                <img src={preloadImage} alt=""/>
            </div>
        )
    }
}

export default Preloader;