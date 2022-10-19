import React from 'react';
import { Formik, Form, Field } from "formik";

export default function Searchbar({ onSubmit }) {
    const handleSubmit = async (values, actions) => {
        await onSubmit(values.images);
        actions.resetForm();
    };

    return (
        <header>
            <Formik
                initialValues={{ images: "" }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <button type="submit">Search</button>
                    <Field
                        name="images"
                        type="text"
                        placeholder="Search images and photos"
                    />
                </Form>  
            </Formik>
        </header>
    );
}
