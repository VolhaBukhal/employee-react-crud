import React, {FC}  from 'react';
import styles from './AppFilter.module.css'


type MyProps = {
    addFilter: (filter: string) => void,
    filter: string,
}

const AppFilter:FC<MyProps>= (props) => {
    const {filter} = props;

    const buttonsData = [
        {name: 'all', label: "All employees" },
        {name: 'promote', label: "To promote" },
        {name: 'salary', label: "Salary down" },
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = filter === name;
        const clazz = active ? "btn-light" :  "btn-outline-light"
        return (
            <button className={`btn ${clazz}`}
                    type="button"
                    key={name}
                    data-filter={name}
                    onClick={() => props.addFilter(name) }>
                    {label}
            </button>
        )
    });

    return (
        <div className={styles.BtnGroup}>
            {buttons}
        </div>

    )
};

export default AppFilter;