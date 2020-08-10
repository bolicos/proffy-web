import React from 'react'

import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import { Teacher } from '../../models/itens';
import api from '../../services/api';

interface TeacherProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {
    function handleNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        })
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preco/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    onClick={handleNewConnection}
                    rel="noopener noreferrer" 
                    href={`https://api.whatsapp.com/send?phone=${teacher.whatsapp}&text=Ola, Tudo bem?`}
                    target="_blank"
                >
                    <img src={whatsappIcon} alt="WhatsApp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;