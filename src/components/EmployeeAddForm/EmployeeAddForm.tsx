import React, {Component} from 'react';
import './EmployeeAddForm.css'

type MyState = {
    name: string,
    salary: string
}

type MyProps = {
    onAddEmployee: (name: string, salary: string) => void;
    
}

class EmployeeAddForm extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    handleValueChange = (event: React.ChangeEvent) => {
        let targetName = (event.target as HTMLInputElement).name;
        let value = (event.target as HTMLInputElement).value;

        if (targetName === "name") {
            this.setState({
                [targetName]: value
            });
        } 

        if (targetName === "salary") {
            this.setState({
                [targetName]: value
            });
        } 
    }

    handleSubmitForm = (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.props.onAddEmployee(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: '',
        })
    }

    render () {
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
            <h3>Add new employee</h3>
            <form
                className="add-form d-flex"
                onSubmit={this.handleSubmitForm}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Employee name?" 
                    name="name"
                    value={name}
                    onChange={this.handleValueChange}/>
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="Salary, $?" 
                    name="salary"
                    value={salary}
                    onChange={this.handleValueChange}/>
    
                <button 
                    type="submit"
                    className="btn btn-outline-light" >
                        Add
                </button>
                    {/* onClick={(e) => this.props.onAddEmployee(e, name, salary)}>Add</button> */}
                    {/* () => onDelete(item.id)} */}
            </form>
        </div>
        );
    }
    
};

export default EmployeeAddForm;