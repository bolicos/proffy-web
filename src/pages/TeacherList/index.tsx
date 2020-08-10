import React, { useState, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import debounce from 'debounce';

import TeacherItem from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import { ListOfSubjects } from '../../models/subject';
import { ListOfWeekDays } from '../../models/week_day';
import Select from '../../components/Select';
import { Teacher } from '../../models/itens';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css'

interface State {
    subject?: string;
    week_day?: number;
    time?: string;
}

function TeacherList() {
    const [teachers, setTeachers] = useState<Array<Teacher>>([]);
    const [form, setForm] = useState(true);

    const { values, handleChange, handleSubmit } = useFormik<State>({
        initialValues: {
            subject: undefined,
            week_day: undefined,
            time: undefined
        },
        onSubmit: values => {
            setForm(true);
        },
    });

    const fetchTeachers = useCallback(debounce(async (parameters: State) => {
        api.get('classes', { params: parameters })
            .then(response => setTeachers(response.data))
            .catch(() => console.log('Error fetch teachers.'))
            .finally(() => setForm(false))

    }, 700), []);

    useEffect(() => {
        if (form) fetchTeachers(values);
        // eslint-disable-next-line
    }, [form]);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis." >
                <form id="search-teachers" onSubmit={handleSubmit}>
                    <Select
                        value={values.subject || ''}
                        name='subject'
                        label='Matéria'
                        options={ListOfSubjects}
                        onChange={handleChange}
                    />
                    <Select
                        value={values.week_day || ''}
                        name='week_day'
                        label='Dia da semana'
                        options={ListOfWeekDays}
                        onChange={handleChange}
                    />
                    <Input
                        value={values.time || ''}
                        name='time'
                        label='Hora'
                        type='time'
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        name='form-button'
                        text='Buscar'
                    />
                </form>
            </PageHeader>
            <main>
                {teachers.map(teacher => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />})
                }
                {teachers.length === 0 && <p>Não há dados para esta busca.</p>}
            </main>
        </div>
    );
}

export default TeacherList;