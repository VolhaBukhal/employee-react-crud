import React, {FC, Component} from 'react';
import './EmployeeItem.css'
import {IEmployeeItem} from 'type/types'

interface MyProps {
    employee: IEmployeeItem;
    increase: boolean;
    onDelete: () => void;
    onToggleIncrease: () => void,
    onChangeSalary: (salary: number, id: number) => void,
}

type MyState = {
    salary: number,
}
class EmployeeItem extends Component<MyProps, MyState> {


    constructor(props: MyProps) {
        super(props);
        this.state = {
            salary: this.props.employee.salary,
        }
    }

    handleChange = (event: React.ChangeEvent) => {
        const salary = (event.target as HTMLInputElement).value.slice(0, -1);
        this.setState({salary: +salary});
        this.props.onChangeSalary(+salary, this.props.employee.id);
    }
    
    render () {
        const {name} = this.props.employee;
        const {increase, onDelete, onToggleIncrease} = this.props;
    let classNames = "list-group-item d-flex justify-content-between";
        return (
            <li className={increase ? classNames + " increase like" : classNames}>
                <span className="list-group-item-label">{name}</span>
                <input 
                    type="text" 
                    className="list-group-item-input" 
                    defaultValue={`${this.state.salary}$`} 
                    onChange={this.handleChange}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleIncrease} 
                        >
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }

    
};

export default EmployeeItem;

