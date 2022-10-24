import React from 'react';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from "formik";
import { MdSearch } from "react-icons/md";

export default function Searchbar({ onSubmit }) {
    const handleSubmit = (values, actions) => {
        if (values.query === "") {
            toast(`Введіть тематику пошуку фото`);
            return;
        }
        onSubmit(values.query);
        actions.resetForm();
    };

    return (
        <header className='Searchbar'>
            <Formik
                initialValues={{ query: "" }}
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
                        name="query"
                        type="text"
                        placeholder="Search images and photos"
                    />
                </Form>  
            </Formik>
        </header>
    );
}
