import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik';

import './styles.css'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { ListOfSubjects } from '../../models/subject';
import { ListOfWeekDays } from '../../models/week_day';
import { Class } from '../../models/itens';
import api from '../../services/api';
import Button from '../../components/Button';

function TeacherForm() {
    const history = useHistory();
    const { values, handleChange, handleSubmit, setFieldValue } = useFormik<Class>({
        initialValues: {
            name: '',
            avatar: '',
            whatsapp: '',
            bio: '',
            subject: '',
            cost: '',
            schedules: [{
                from: '',
                to: '',
                week_day: ''
            }]
        },
        onSubmit: values => {
            api.post('classes', values).then(() => {
                history.push('/');
            }).catch(() => {

            });
        },
    });

    function addNewScheduleItem() {
        const itens = values.schedules;
        itens.push({ from: '', to: '', week_day: '' });
        setFieldValue('schedules', itens);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title='Que incrível que você quer dar aulas.'
                description='O primeiro passo é preencher este formulário de inscrição.'
            />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input
                            value={values.name}
                            name='name'
                            label='Nome Completo'
                            onChange={handleChange}
                        />
                        <Input
                            value={values.avatar}
                            name='avatar'
                            label='Avatar'
                            onChange={handleChange}
                        />
                        <Input
                            value={values.whatsapp}
                            name='whatsapp'
                            label='WhatsApp'
                            onChange={handleChange}
                        />
                        <Textarea
                            value={values.bio}
                            name='bio'
                            label='Biografia'
                            onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            value={values.subject || ''}
                            name='subject'
                            label='Matéria'
                            options={ListOfSubjects}
                            onChange={handleChange}
                        />
                        <Input
                            value={values.cost}
                            name='cost'
                            label='Custo da sua hora por aula'
                            onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                        </button>
                        </legend>

                        {values.schedules?.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select
                                        value={values.schedules[index].week_day || ''}
                                        name={`schedules.${index}.week_day`}
                                        label='Dia da semana'
                                        options={ListOfWeekDays}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        value={values.schedules[index].from}
                                        name={`schedules.${index}.from`}
                                        label='Das'
                                        type='time'
                                        onChange={handleChange}
                                    />
                                    <Input
                                        value={values.schedules[index].to}
                                        name={`schedules.${index}.to`}
                                        label='Até'
                                        type='time'
                                        onChange={handleChange}
                                    />
                                </div>
                            );
                        })

                        }

                    </fieldset>

                    <footer>

                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>

                        <Button
                            type="submit"
                            name='form-button'
                            text='Salvar Cadastro'
                        />

                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;