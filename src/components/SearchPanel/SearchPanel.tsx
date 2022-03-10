import React, {Component} from 'react';
import styles from './SearchPanel.module.css'

type MyState = {
    searchStr: string,
}

type MyProps = {
    addSearchWord: (value: string) => void,

}

class SearchPanel extends Component<MyProps, MyState>{
    constructor (props: MyProps) {
        super(props);
        this.state = {
            searchStr: ''
        }
    }

    handleSearchBar = (event: React.ChangeEvent) => {
        let searchValue = (event.target as HTMLInputElement).value;
        this.setState({searchStr: searchValue});
        this.props.addSearchWord(searchValue);
    }

    render () {
        return (
            <input 
                type="text"
                className={styles.SearchPanel}
                placeholder="Find employee"
                value={this.state.searchStr}
                onChange={this.handleSearchBar}
            />
        )
    }

};

export default SearchPanel;