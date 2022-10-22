import { render } from '@testing-library/react';
import {Component} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
    render() {
        const { children } = this.props;
        return createPortal(
            <div className="Overlay">
                <div className="Modal">
                    {children}
                </div>
            </div>,
            modalRoot
        )
    }
};
