import React, {FC} from 'react';
import styles from './AppInfo.module.css'

type MyProps = {
    totalAmount: number;
    amountToEncrease: number;
}


const AppInfo:FC<MyProps> = ({totalAmount, amountToEncrease}) => {
    return (
        <div className={styles.AppInfo}>
            <h1>Employee in a company</h1>
            <h2>Total amount of employee: {totalAmount}</h2>
            <h2>Bonus will receive: {amountToEncrease}</h2>
        </div>
    ) 
}

export default AppInfo;