import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { LoginFormValues } from '../../../types/requestTypes'
import TextField from '@material-ui/core/TextField';
import './AuthForm.scss'
import { Button, CircularProgress } from '@material-ui/core';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { sagasActions } from '../../../store/saga/sagasActions';
import { Api } from '../../../Api';
import { updateCookieTokens } from '../../../utils/cookie'


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

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: LoginFormValues) => {
            sendData(values)
        },
    })

    const dispatch = useDispatch()

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (serverError) setServerError('')
        formik.handleChange(e)
    }

    const sendData = async (fields: LoginFormValues) => {
        const { email, password } = fields
        setServerError('')
        setLoading(true)
        const userData = await Api.login({ email, password })
        setLoading(false)
        if (userData && userData.success) {
            updateCookieTokens(userData.tokens)
            dispatch(sagasActions.initialUser())
            return
        }
        setServerError('Неверный логин или пароль')
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
                    onChange={changeHandler}
                />
            </label>

            <label className="auth-form__field">
                <TextField
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    className="auth-form__text-input"
                    value={formik.values.password}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.errors.password}
                    onChange={changeHandler}
                />
            </label>

            <div className="auth-form-error">
                <p>{serverError}</p>
            </div>

            {isLoading && <CircularProgress style={{ width: 30, height: 30 }}/>}

            <Button
                type="submit"
                variant="outlined"
                size="medium"
                color="primary"
                className="auth-form__send"
                disabled={isLoading}
            >
                Войти
            </Button>
        </form>

    )
}

export default AuthForm