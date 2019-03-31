import React, { Component } from 'react';
import Report from './Report';
import Sort from './Sort';
import Filter from './Filter';
import ReportModal from './ReportModal';

class Results extends Component{
    constructor(props){
        super(props);
        this.state={
            modalIsOpen : false,
            modalObj: {
                imageUrl: ' ',
                title:' ',
                description:' ',
                publishedDate:' ',
                cost:' '
            },
            sort: false,
            filter: false
        }
        
    }

    openModal = (e) => {
        
        this.setState({
            modalIsOpen: true,
            modalObj : {
                imageUrl: e.imageUrl,
                title: e.title,
                description: e.description,
                publishedDate: e.publishedDate,
                cost: e.cost
            }
        })
    }
    closeModal = () =>{
        this.setState({
            modalIsOpen: false,
            modalObj: {
                imageUrl: ' ',
                title:' ',
                description:' ',
                publishedDate:' ',
                cost:' '
            }
        })
    }
    sortfilterClick = (e) => {
        e.preventDefault();
        if(e.target.value === 'sort'){
            if(this.state.sort === false)
                this.setState({sort : true});
            else
                this.setState({sort : false});
        }
        else if(e.target.value === 'filter'){
            if(this.state.filter === false)
                this.setState({filter : true});
            else
                this.setState({filter : false});
        }
            
    }
    
    render(){
        return(
        <div>
        {this.props.result.length>1 ? <div>
        <button value="sort" className="sortFilterBtn" onClick={this.sortfilterClick}>Sort</button>
        <button value="filter" className="sortFilterBtn" onClick={this.sortfilterClick}>Filter</button>
        </div> : '' }
        {this.state.sort ? <Sort onSortChange={this.props.onSortChange} /> : ''}
        {this.state.filter ? <Filter onFilter={this.props.onFilter} onReset={this.props.onReset}/> : ''}
        {this.props.result.map((obj, index) => (
            <div key={obj.id} onClick={this.openModal.bind(this, obj)}>
            <Report key={index} obj = {obj} />
            </div>
            ))
        }
        <ReportModal 
        modalIsOpen={this.state.modalIsOpen}
        closeModal={this.closeModal}
        obj={this.state.modalObj}
        />
        </div>
        
        );
    }
}
export default Results;


// {this.props.result.length>1 ? <Filter /> : ''}
