import React from 'react';
import Accountbook from '../../../Componenets/AccountBook/Accountbook';

const AccountBookMain = () => {
    return (
        <div style={{ width : '100%', margin : '0 auto'}}>
            <img src={require('../../../img/tiggle_write_bar.png')} style={ {width : "500px"}} />
            <Accountbook />
        </div>
    );
};

export default AccountBookMain;