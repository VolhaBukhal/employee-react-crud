import React, {FC, Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import AppInfo from './components/AppInfo';
import SearchPanel from './components/SearchPanel'
import AppFilter from './components/AppFilter';
import EmployeeList from './components/EmployeeList';
import EmployeeAddForm from './components/EmployeeAddForm';
import { convertToObject } from 'typescript';
import {IEmployeeItem, Filters} from './type/types'

// interface MyProps {
//   name: string;
//   surname: string;
// }
// type MyState = {
//   year: number,
//   text: string,
//   role: string
// }
// class WhoAmI extends Component<MyProps, MyState> {
//   constructor(props: MyProps) {
//     super(props);
//     this.state = {
//       year: 36,
//       text: '+++',
//       role: ''
//     }
//     this.nextYear = this.nextYear.bind(this);
//    }

//   nextYear(){
//     console.log('from nextYear', this)
//     this.setState(state => ({
//       year: state.year + 1
//     }))
//   }


//   handleInput = (event: React.ChangeEvent<HTMLInputElement>, color: string) => {
//     console.log(color);
//     this.setState({
//       role: (event.target as HTMLInputElement).value
//     })
//     // (event.target as HTMLInputElement).value = '';
    
//   }

//   render () {
//     const {name, surname} = this.props;
//     const {year} = this.state;

//     return (
//       <div>
//         <button onClick={this.nextYear}>{this.state.text}</button>
//         <h1>My name is {name} {surname}, age - {year}, role - {this.state.role}</h1>
//         {/* <a href={props.link} target="_blank" rel="noreferrer"> profile</a> */}
//         <form>
//           <span>Enter you role</span>
//           <input type="text" onChange={(e) => this.handleInput(e, 'some color')}/>
//         </form>
//       </div>
//       )
//   }
// } 
 



type MyState = {
  data: IEmployeeItem[],
  search: string,
  filter: string
}

type MyProps = {
  message: string;
}



class App extends Component <{}, MyState> {
  maxId: number;

  constructor(props: MyProps) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, id: 2},
        {name: 'Carl W.', salary: 5000, increase: false, id: 3},
        {name: 'Den M.', salary: 3000, increase: true, id: 4},
      ],
      search: '',
      filter: Filters.ALL
    };
    this.maxId = 5;
  }

  handleDeleteItem = (employeeId: number) => {
    this.setState(({data}) => ({
      data: data.filter(item => item.id !== employeeId)
    }))
  }

  handleAddEmployee = ( name: string, salary: string) => {
    if(name && salary) {
      const newEl =  {name: name, salary: +salary, increase: false, id: this.maxId++};
      this.setState(({data}) => {
        const newData = [...data, newEl];
        return {
          data: newData
        }
      })
    } else {
      alert('Enter name and salary first');
    }
  }

  handleToggleIncrease = ( employeeId: number ) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === employeeId) {
          return {...item, increase: !item.increase};
        }
        return item;
       })
    }))
  }

  handleToggleRise = ( id:number ) => {
    console.log(`Rise this: ${id}`)
  }

  searchEmployee = (items: IEmployeeItem[] , searchStr: string) => {
    if (searchStr.length === 0) {
      return items;
    }
    
    return items.filter(item => item.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1)
  } 

  updateSearchWord = (search: string) => {
    // this.setState({search: search})
    this.setState({search}) // the same name -> leav only one name 
  }

  updateFilter = (filter: string) => {
    this.setState({filter});
  }

  filterEmployee = ( items: IEmployeeItem[] , filter: string) => {

    switch (filter) {
      case (Filters.ALL):
        return items.sort( (a, b) => a.id - b.id);

      case (Filters.PROMOTE):
        return items.filter( item => item.increase);
      
      case (Filters.SALARY):
        return items.sort( (a, b) => b.salary - a.salary);
      
      default: 
         return items;  
    }
  }

  updateSalary = (salary: number, employeeId: number, ) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === employeeId) {
          return {...item, salary: salary};
        }
        return item;
      })
    }))
  }

  render () {
    const {data, search, filter} = this.state;

    const visibleData = this.filterEmployee(this.searchEmployee(data, search), filter);

    const amountToEncrease = this.state.data.filter(item => item.increase).length;
    return (
      <div className="App">
        <AppInfo 
          totalAmount={data.length}
          amountToEncrease={amountToEncrease}/>
        <div className="search-panel">
          <SearchPanel
            addSearchWord={this.updateSearchWord}
          />
          
          <AppFilter addFilter={this.updateFilter} filter={filter}/>

          {
            (visibleData.length > 0) ? 
            (
              <EmployeeList 
                data={visibleData}
                onDelete={this.handleDeleteItem}
                onToggleIncrease={this.handleToggleIncrease}
                onUpdateSalary={this.updateSalary}/>
            )
            :
            (
              <div style={{fontSize: 30}}> There is now employees with asked params</div>
            )
          }
 
          <EmployeeAddForm onAddEmployee={this.handleAddEmployee}/>
        </div>
      </div>
    );
  }


}

export default App;
