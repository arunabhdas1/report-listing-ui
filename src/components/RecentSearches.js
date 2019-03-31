import React, { Component } from 'react';

class RecentSearches extends Component{
    constructor(props){
        super(props);
        this.state={
            result : []
        };
    }
    recentSearchBtnCLick = (e) => {
        e.preventDefault();
        let val = e.target.value.trim();
        //this.props.box.value = val;
        this.props.searchBtnClick(val);
    }
    componentWillMount(){
        fetch('https://report-listing-backend.herokuapp.com/api/data/recentSearches')
        .then(res => res.json())
        .then(data => {
        let result =[];
        data.map((obj, index) => {
            result.push(obj);
          });
        this.setState({result});
      });
    }
    render(){
        return(
            <div>
            {this.state.result.length >0 ? 
            <div className="recentSearch">
            <a className="recentSearchTitle">Recent:</a> 
            {this.state.result.map((obj, index) => (
                <button className="recentSearchBtn" key={index} onClick={this.recentSearchBtnCLick} value={obj.val}>{obj.val}</button>
                ))}
            </div>
            : ''}
            </div>
        );
    }
}
export default RecentSearches;