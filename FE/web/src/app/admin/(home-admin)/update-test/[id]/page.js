'use client'

import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useParams } from 'next/navigation';

const page = () => {
    const [test, setTest] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/api/admin/tests/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json();
                setTest(data.result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!test) {
        return <Spin />;
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...test.questions];
        list[index][name] = value;
        setTest(prevState => ({ ...prevState, questions: list }));
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const { value } = e.target;
        const list = [...test.questions];
        list[questionIndex].options[optionIndex] = value;
        setTest(prevState => ({ ...prevState, questions: list }));
    };

    const handleCorrectOptionChange = (e, questionIndex) => {
        const { value } = e.target;
        const list = [...test.questions];
        list[questionIndex].correctOption = value;
        setTest(prevState => ({ ...prevState, questions: list }));
    };

    const handleTestChange = (e) => {
        setTest({ ...test, [e.target.name]: e.target.value });
    };

    const handleAddQuestion = () => {
        setTest(prevState => ({ ...prevState, questions: [...prevState.questions, { questionText: '', options: ['', '', '', ''], correctOption: '' }] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(test)
    };

    const handleRemoveQuestion = (index) => {
        const list = [...test.questions];
        list.splice(index, 1);
        setTest(prevState => ({ ...prevState, questions: list }));
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* Render test fields */}
            <label>
                Exam:
                <input name="exam" value={test.exam} onChange={handleTestChange} /> <br />
            </label>
            {/* ... */}
            {/* Render question fields */}
            {test?.questions?.map((x, i) => (
                <div key={i}>
                    <label>
                        Question Text:
                        <input name="questionText" value={x.questionText} onChange={e => handleInputChange(e, i)} /> <br />
                    </label>
                    {x.options.map((option, j) => (
                        <label key={j}>
                            Option {j + 1}:
                            <input value={option} onChange={e => handleOptionChange(e, i, j)} /> <br />
                        </label>
                    ))}
                    <label>
                        Correct Option:
                        <input value={x.correctOption} onChange={e => handleCorrectOptionChange(e, i)} /> <br />
                    </label>
                    <button type="button" onClick={() => handleRemoveQuestion(i)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={handleAddQuestion} className='form-submit'>+</button>
            <button type="submit" className='form-submit'>Submit</button>
        </form>
    )
}

export default page