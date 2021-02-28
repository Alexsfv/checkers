import { Button, CircularProgress, TextField } from '@material-ui/core'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { RegisterFormData, RegisterFormValues } from '../../../types/requestTypes'
import * as yup from 'yup'
import { REGISTER_URL } from '../../../config'
import { checkUniqueEmail } from '../../../utils/other'

const validationSchema = yup.object({
    email: yup.string()
        .email('Введите корректный Email')
        .required('Обязательное поле')
        .test('unique-email', 'Такой Email уже зарегистрирован', checkUniqueEmail),
    nickName: yup.string()
        .min(4, 'Минимум 4 символа')
        .required('Обязательное поле'),
    password: yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароль должны совпадать')
        .required('Обязательное поле')
})

type RegisterFormProps = {}

const RegisterForm: React.FC<RegisterFormProps> = () => {

    const [isLoading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            nickName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        validateOnChange: false,
        onSubmit: async (values: RegisterFormValues) => {
            const imgUrl = await getRandomImg()
            await sendData({
                email: values.email,
                nickName: values.nickName,
                password: values.password,
                image: imgUrl,
            })
            formik.resetForm()
        },
    })


    const sendData = async (data: RegisterFormData) => {
        try {
            console.log('register', data)
            setLoading(true)
            const res = await axios.put(REGISTER_URL, data)
            setLoading(false)
            console.log('register res', res)
        } catch (e) {
            console.log(e)
        }
    }

    const getRandomImg = async() => {
        const res = await axios.get('https://picsum.photos/400')
        return res.request.responseURL
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

            {isLoading && <CircularProgress style={{ width: 30, height: 30 }}/>}

            <Button
                type="submit"
                variant="outlined"
                size="medium"
                color="primary"
                className="auth-form__send"
                disabled={isLoading}
            >
                Регистрация
                </Button>
        </form>
    )
}

export default RegisterForm