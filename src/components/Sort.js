import React, { Component } from 'react';

class Sort extends Component{
    constructor(props){
        super(props);
    }
    onSortChange = (e) => {
        let sort = e.target.value;
        this.props.onSortChange(sort);
    }
    
    render(){
    return(
        <div className="sortBox">
            <div className="sortBoxTitle">Sort By</div>
            <div className="sortBtnBox">
            <div>
            <button className="sortBtn" onClick={this.onSortChange} value="costAsce">Cost - Low to High</button>
            <button className="sortBtn" onClick={this.onSortChange} value="costDesc">Cost - High to Low</button>
            </div>
            <div>
            <button className="sortBtn" onClick={this.onSortChange} value="dateAsce">Publishing Date - Oldest First</button>
            <button className="sortBtn" onClick={this.onSortChange} value="dateDesc">Publishing Date - Newest First</button>
            </div>
            </div>
        </div>
    );
    }
}
export default Sort;


// <span>
//                 Publishing Date
//                 <select onChange={this.onSortChange}>
//                     <option value="dateAsce">Ascending</option>
//                     <option value="dateDesc">Descending</option>
//                 </select>
//             </span>
//             <span>
//                 Publishing Cost
//                 <select onChange={this.onSortChange}>
//                     <option value="costAsce">Ascending</option>
//                     <option value="costDesc">Descending</option>
//                 </select>
//             </span>