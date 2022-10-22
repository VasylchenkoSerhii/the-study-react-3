import {Component} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
    render() {
        const { onClose, children } = this.props;
        return createPortal(
            <div onClick={onClose} className="Overlay">
                <div className="Modal">
                    {children}
                </div>
            </div>,
            modalRoot
        )
    }
};
