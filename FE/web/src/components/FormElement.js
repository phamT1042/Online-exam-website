import React from 'react'

const FormElement = ({ type, label, placeHolder, handleChange, handleBlur, errorVal, handleClick }) => {
    return (
        <div className='flex mb-3 flex-col'>
            <label htmlFor={type} className='text-left font-bold pt-2 text-xl'> {label} </label>
            <input
                id={type}
                name={type}
                type={(type == 'password' || type == 'confirmPassword') ? 'password' : 'text'}
                placeholder={placeHolder}
                className={`form-input ${errorVal ? 'border-red-600' : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={handleClick}
            />
            <span className={`text-sm pt-[3px] text-red-600 text-left ${!errorVal ? 'hidden' : ''}`}> {errorVal} </span>        
        </div>
    )
}

export default FormElement