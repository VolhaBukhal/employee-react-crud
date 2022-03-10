import React, {Component} from 'react';
import './EmployeeList.css'
import EmployeeItem from '../EmployeeItem';
import {IEmployeeItem} from 'type/types'

interface MyProps {
    data: IEmployeeItem[],
    onDelete: (id: number) => void,
    onToggleIncrease: (id: number) => void,
    onUpdateSalary: (id: number, salary: number) => void,
}

interface MyState {
    id: number,
    salary: number, 
}

class EmployeeList extends Component<MyProps, MyState>{
    constructor (props: MyProps) {
        super(props);
        this.state = {
            id: 1,
            salary: 0,
        }
    }

    updateItemState = (salary: number, id: number) => {
        this.setState({id: id, salary: salary})
        this.props.onUpdateSalary(salary, id);
    }
    

    render () {
        const {data, onDelete, onToggleIncrease} = this.props;
        return (
            <ul className="app-list list-group">
                {
                    data.map( item => {
                        return (
                            <EmployeeItem 
                            key={item.id} 
                            employee={item}
                            increase={item.increase}
                            onDelete={() => onDelete(item.id)}
                            onToggleIncrease={() => onToggleIncrease(item.id)}
                            onChangeSalary={this.updateItemState}
                            />
                        )
                    })
                }
            </ul>
        );
    }

    
};

export default EmployeeList;