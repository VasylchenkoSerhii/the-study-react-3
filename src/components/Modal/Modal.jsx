import {Component} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleClickByEscape);
    };

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleClickByEscape);
    };
    

    handleClickByEscape = e => {
        if (e.code === "Escape") {
            this.props.toggleModal();
        };
    };
    
    render() {
        const { toggleModal, children } = this.props;
        return createPortal(
            <div onClick={()=> toggleModal()} className="Overlay">
                <div className="Modal">
                    {children}
                </div>
            </div>,
            modalRoot
        )
    }
};
