import React from 'react';
import DiscountCalendar from "../../Componenets/DiscountCalendar/DiscountCalendar"

const Main = () => {
    return (
        <div>
            <img src={require('../../img/tiggle_info_bar.png')} style={ {width : "500px"}} />
            <DiscountCalendar />
            
        </div>
    );
};

export default Main;