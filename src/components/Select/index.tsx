import React, { SelectHTMLAttributes } from 'react';
import './styles.css'
import { Item } from '../../models/itens';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
 label: string;
 name: string;
 options: Array<Item>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest })  => {
    return (
        <div className="select-block">
            <label htmlFor={name} >{label}</label>
            <select id={name} {...rest} >
                <option key="" value="" disabled hidden >Selecione uma opção</option>
                { options.map((option: Item) => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                }) }
            </select>
        </div>
    );
}

export default Select;