'use client'

import { useState } from 'react';

const page = () => {
    const [test, setTest] = useState({
        exam: '',
        name: '',
        type: 1,
        startDay: '',
        endDay: '',
        startTime: '',
        duration: 60,
        questions: [{ questionText: '', options: ['', '', '', ''], correctOption: '' }],
    });

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
            {test.questions.map((x, i) => (
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
    );
}

export default page