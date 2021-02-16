import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { LoginFormValues } from '../../../types/requestTypes'
import TextField from '@material-ui/core/TextField';
import './AuthForm.scss'
import { Button } from '@material-ui/core';
import * as yup from 'yup'
import { LOGIN_URL } from '../../../config';
import { LoginResponse } from '../../../types/responseTypes';

type AuthFormProps = {}

const validationSchema = yup.object({
    email: yup.string()
        .email('Введите корректный Email')
        .required('Обязательное поле'),
    password: yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле')
})

const AuthForm: React.FC<AuthFormProps> = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: LoginFormValues) => {
            sendData(values)
            formik.resetForm()
        },
    })

    const sendData = async (fields: LoginFormValues) => {
        try {
            const res = await axios.post(LOGIN_URL, fields)
            console.log('login res', res)
            const data = res.data as LoginResponse
            if (res.data.success) {
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <form className="auth-form" onSubmit={formik.handleSubmit}>
            <label className="auth-form__field">
                <TextField
                    name="email"
                    label="Email"
                    className="auth-form__text-input"
                    value={formik.values.email}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                />
            </label>

            <label className="auth-form__field">
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    className="auth-form__text-input"
                    value={formik.values.password}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                />
            </label>

            <Button
                type="submit"
                variant="outlined"
                size="medium"
                color="primary"
                className="auth-form__send"
            >
                Войти
            </Button>
        </form>

    )
}

export default AuthForm