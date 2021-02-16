import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { RegisterFormValues } from '../../../types/requestTypes'
import * as yup from 'yup'
import { UniqueEmailResponse } from '../../../types/responseTypes'
import { REGISTER_URL, CHECK_UNIQUE_EMAIL_URL } from '../../../config'


const checkUniqueEmail = async (value: string | undefined) => {
    try {
        const res = await axios.post(CHECK_UNIQUE_EMAIL_URL, { email: value })
        console.log(res)
        const data = res.data as UniqueEmailResponse
        if (data) {
            return data.isUniqueEmail
        }
        return false
    } catch(e) {
        console.log(e)
        return false
    }
}

const validationSchema = yup.object({
    email: yup.string()
        .email('Введите корректный Email')
        .required('Обязательное поле')
        .test('unique-email', 'Такой Email уже зарегистрирован', checkUniqueEmail),
    nickName: yup.string()
        .min(4, 'Минимум 4 символа')
        .required('Обязательное поле'),
    password: yup.string()
        .min(4, 'Минимум 4 символа')
        .required('Обязательное поле'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароль должны совпадать')
        .required('Обязательное поле')
})

type RegisterFormProps = {}

const RegisterForm: React.FC<RegisterFormProps> = () => {


    const formik = useFormik({
        initialValues: {
            email: '',
            nickName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: (values: RegisterFormValues) => {
            sendData({
                email: values.email,
                nickName: values.nickName,
                password: values.password
            })
            formik.resetForm()
        },
    })


    const sendData = async (data: RegisterFormValues) => {
        try {
            console.log('register', data)
            const res = await axios.put(REGISTER_URL, data)
            console.log('register res', res)
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
                    helperText={formik.errors.email}
                    onChange={formik.handleChange}
                />
            </label>

            <label className="auth-form__field">
                <TextField
                    name="nickName"
                    label="NickName"
                    className="auth-form__text-input"
                    value={formik.values.nickName}
                    error={formik.touched.nickName && !!formik.errors.nickName}
                    helperText={formik.errors.nickName}
                    onChange={formik.handleChange}
                />
            </label>

            <label className="auth-form__field">
                <TextField
                    name="password"
                    label="Пароль"
                    type="password"
                    className="auth-form__text-input"
                    value={formik.values.password}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                />
            </label>

            <label className="auth-form__field">
                <TextField
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                    className="auth-form__text-input"
                    value={formik.values.confirmPassword}
                    error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    helperText={formik.errors.confirmPassword}
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
                Регистрация
                </Button>
        </form>
    )
}

export default RegisterForm