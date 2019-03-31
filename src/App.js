import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SearchBox from './components/SearchBox';
import Results from './components/Results';
import './styles/styles.css'
import Filter from './components/Filter';

class App extends Component {
  state = {
    key: '',
    result: [],
    resultWithoutFilter: [],
    searched: false
  }

  searchBtnClick = (key) => {
    let url = 'http://localhost:3000/api/data/search/' + key;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let result =[];
        console.log('Fetching results');
        data.map((obj, index) => {
            result.push(obj);
          });
        this.setState({result: result});
        this.setState({resultWithoutFilter: result});
        this.setState({searched: true});
      }).catch(error => console.log(error));
  }
  onSortChange = (sort) => {
    let result = this.state.result;
    if(sort === 'dateAsce'){
      result.sort((a,b) => (Date.parse(a.publishedDate) > Date.parse(b.publishedDate)) ? 1 : ((Date.parse(b.publishedDate) > Date.parse(a.publishedDate)) ? -1 : 0)); 
      this.setState({result});
    }
    else if(sort === 'dateDesc'){
      result.sort((a,b) => (Date.parse(a.publishedDate) < Date.parse(b.publishedDate)) ? 1 : ((Date.parse(b.publishedDate) < Date.parse(a.publishedDate)) ? -1 : 0)); 
      this.setState({result});
    }
    else if(sort === 'costAsce'){
      result.sort((a,b) => (parseInt(a.cost) > parseInt(b.cost)) ? 1 : ((parseInt(b.cost) > parseInt(a.cost)) ? -1 : 0)); 
      this.setState({result});
    }
    else if(sort === 'costDesc'){
      result.sort((a,b) => (parseInt(a.cost) < parseInt(b.cost)) ? 1 : ((parseInt(b.cost) < parseInt(a.cost)) ? -1 : 0)); 
      this.setState({result});
    }
  }
  onFilter = (filterObj) => {
    let result = this.state.result;
    if((filterObj.dateStart !== '' && filterObj.dateEnd !== '') && (filterObj.costStart !== '' && filterObj.costEnd !== '')){
      let initial = filterObj.dateStart.split(/-/);
      let dateStart = Date.parse([ initial[1], initial[2], initial[0] ].join('/'));
      let final = filterObj.dateEnd.split(/-/);
      let dateEnd = Date.parse([ final[1], final[2], final[0] ].join('/'));
      if(dateStart < dateEnd && parseInt(filterObj.costStart) < parseInt(filterObj.costEnd)){
        let ar = result.filter(obj => Date.parse(obj.publishedDate) >= dateStart && Date.parse(obj.publishedDate) <= dateEnd );
        let ar2 = ar.filter(obj => parseInt(obj.cost) >= parseInt(filterObj.costStart) && parseInt(obj.cost) <= parseInt(filterObj.costEnd));
        this.setState({result : ar2});
      }
      else{
        alert('Please input valid filters');
        this.onReset();
      }
      
    }
    else if((filterObj.dateStart !== '' && filterObj.dateEnd !== '') && (filterObj.costStart === '' && filterObj.costEnd === '')){
      let initial = filterObj.dateStart.split(/-/);
      let dateStart = Date.parse([ initial[1], initial[2], initial[0] ].join('/'));
      let final = filterObj.dateEnd.split(/-/);
      let dateEnd = Date.parse([ final[1], final[2], final[0] ].join('/'));
      if(dateStart < dateEnd){
      let ar = result.filter(obj => Date.parse(obj.publishedDate) >= dateStart && Date.parse(obj.publishedDate) <= dateEnd );
      this.setState({result : ar});
      }
      else{
        alert('Please input valid filters');
        this.onReset();
      }
    }
    else if((filterObj.dateStart === '' && filterObj.dateEnd === '') && (filterObj.costStart !== '' && filterObj.costEnd !== '')){
      if(parseInt(filterObj.costStart) < parseInt(filterObj.costEnd)){
        let ar = result.filter(obj => parseInt(obj.cost) >= parseInt(filterObj.costStart) && parseInt(obj.cost) <= parseInt(filterObj.costEnd));
        this.setState({result : ar});
      }
    }
    else{
      alert('Please input valid filters');
      this.onReset();
    }
  }
  onReset = () => {
    let result = this.state.resultWithoutFilter;
    console.log(result);
    this.setState({result: result});
  }
  
  render() {
    return (
      <div >
      <NavBar /> 
      <div className="container"> 
      <SearchBox searchBtnClick={this.searchBtnClick}/>
      {this.state.result.length>0 ? <Results result={this.state.result} 
        onSortChange={this.onSortChange} 
        onFilter={this.onFilter}
        onReset={this.onReset}/> : 
        this.state.searched ?
        <div className="notFound">No results found. Please use a different search term or filter.</div>: ''}
      
      </div>
      
      </div>
    );
  }
}

export default App;
