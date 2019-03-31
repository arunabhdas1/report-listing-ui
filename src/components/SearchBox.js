import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import RecentSearches from './RecentSearches';

class SearchBox extends Component{
    state={
        result: [],
        value: '',
        recent: []
    }
    onTextChange = (e) => {
        const key = e.target.value.trim();
        this.getSuggestions(key);
    }
    getSuggestions = (key) => {
        let url = 'http://localhost:3000/api/data/suggestion/' + key;
        fetch(url)
            .then(res => res.json())
            .then(result => {
            this.setState({result});
            }); 
    }
    onSearchBtnClick = (e) => {
        e.preventDefault();
        const key = this.state.value;
        this.props.searchBtnClick(key);    
    }
    searchBtnClick = (key) => {
        this.setState({value: key});
        this.props.searchBtnClick(key);
        
    }
    recentSearchReRender = () => {
        fetch('http://localhost:3000/api/data/recentSearches')
        .then(res => res.json())
        .then(data => {
        let result =[];
        data.map((obj, index) => {
            result.push(obj);
          });
        this.setState({recent: result});
      });
    }
    render(){
        return(
            <div>
                <form className="searchBox" onChange={this.onTextChange} onSubmit={this.onSearchBtnClick}>
                <ReactAutocomplete
                id="searchBox"
                name="searchBox"
                items={this.state.result}
                shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item}
                renderItem={(item, highlighted) =>
                  <div style={{textAlign: "left"}}>
                    {item}
                  </div>
                }
                renderInput={(props) => 
                <input className="searchBoxInput" {...props}></input>}
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
                autoComplete={true}
              />
                    <button className="searchBoxButton">Search</button>
                </form>
                <RecentSearches searchBtnClick={this.searchBtnClick} />
            </div>
        );
    }
}
export default SearchBox;