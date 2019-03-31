import React, { Component } from 'react';

class Filter extends Component{
    constructor(props){
        super(props);
        
    }
    resetBtnClick = (e) => {
        e.preventDefault();
        this.props.onReset();
        this.filterForm.reset();
    }
    
    onFilter = (e) => {
        e.preventDefault();
        
        let filterObj = {
            dateStart: e.target.elements.dateStart.value,
            dateEnd: e.target.elements.dateEnd.value,
            costStart: e.target.elements.costStart.value,
            costEnd: e.target.elements.costEnd.value
        }
        this.props.onFilter(filterObj);
    }
    render(){
        return(
            <div className="sortBox">
            <div className="sortBoxTitle">Filter</div>
            <div className="filterBtnBox">
            <form ref={r => this.filterForm = r} className="sortBoxTitle" onSubmit={this.onFilter} >
            <div>
            <div>
                Publishing Date
                <div className="filterboxes">
                <div>
                    <div className="filterTitle">Start</div>
                    <input id="dateStart"  className="filterBoxInput" type="date" />
                </div>
                <div>
                    <div className="filterTitle">End</div>
                    <input id="dateEnd"  className="filterBoxInput" type="date" />
                </div>
                </div>
            </div>
            <div>
                Cost
                <div className="filterboxes">
                <div>
                    <div className="filterTitle">From</div>
                    <input id="costStart"  className="filterBoxInput" type="number" min={0} />
                </div>
                <div>
                    <div className="filterTitle">To</div>
                    <input id="costEnd"  className="filterBoxInput" type="number" min={0} />
                </div>
                </div>
            </div>
            </div>
            <button value="filter" className="filterButton">Filter</button>
            <button value="reset" onClick={this.resetBtnClick} className="filterButton">Reset</button>
            </form>
            </div>
            </div>
        );
    }
}
export default Filter;