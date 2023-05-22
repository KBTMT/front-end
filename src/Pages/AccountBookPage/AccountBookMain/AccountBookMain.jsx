import React from 'react';
import MyCalendar from '../../../Componenets/AccountCalendar/AccountCalendar'
import FinancialCalendar from '../../../Componenets/FinancialCalendar/FinancialCalendar';

const AccountBookMain = () => {
    return (
        <div style={{ width: '70%', margin:'0 auto'}}>
            <FinancialCalendar />
        </div>
    );
};

export default AccountBookMain;