import React from 'react';
import { Formik, Form, Field } from "formik";
import { MdSearch } from "react-icons/md";

export default function Searchbar({ onSubmit }) {
    const handleSubmit = async (values, actions) => {
        await onSubmit(values.images);
        actions.resetForm();
    };

    return (
        <header className='Searchbar'>
            <Formik
                initialValues={{ images: "" }}
                onSubmit={handleSubmit}
            >
                <Form className='SearchForm'>
                    <button type="submit" className='SearchForm-button'>
                        <MdSearch
                            size="40"
                            aria-label="Search images"
                        />
                    </button>
                    <Field
                        className="SearchForm-input"
                        name="images"
                        type="text"
                        placeholder="Search images and photos"
                    />
                </Form>  
            </Formik>
        </header>
    );
}
