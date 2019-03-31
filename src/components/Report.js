import React, { Component } from 'react';

class Report extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="reportBox">
            <div className="reportBoxImg">
               <img className="reportImg" src={this.props.obj.imageUrl} />
            </div>
            <div className="reportBoxInfo">
               <div className="reportBoxInfoTitle">{this.props.obj.title}</div>
               <div className="reportBoxInfoDesc">{this.props.obj.description}</div> 
               <div className="reportBoxInfoPub">Published: {this.props.obj.publishedDate}</div>
               <div className="reportBoxInfoCost">Cost of Report: ${this.props.obj.cost}</div>
            </div>  
            </div>
        );
    }
}
export default Report;