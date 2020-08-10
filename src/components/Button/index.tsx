import React, { ButtonHTMLAttributes } from 'react';
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    name: string;
}

const Button: React.FC<ButtonProps> = ({ text, name, ...rest }) => {
    return (
        <button id={name} className="button-block" {...rest} >
            {text}
        </button>
    );
}

export default Button;