import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')
const ReportModal = (props) => {
    return(
    <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    className="modal"
    >
    <div className="modalBox">
        <div className="modalBoxImg">
            <img className="modalImg" src={props.obj.imageUrl} />
        </div>
        <div className="modalBoxInfo">
            <div className="modalBoxInfoTitle">{props.obj.title}</div>
            <div className="modalBoxInfoDesc">{props.obj.description}</div> 
            <div className="modaltBoxInfoPub">Published: {props.obj.publishedDate}</div>
            <div className="modalBoxInfoCost">Cost of Report: ${props.obj.cost}</div>
        </div>  
    </div>
    </Modal>
    );
}
export default ReportModal;