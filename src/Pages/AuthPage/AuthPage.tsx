import React, { useState } from 'react'
import AuthForm from '../../Components/auth/AuthForm/AuthForm'
import RegisterForm from '../../Components/auth/RegisterForm/RegisterForm'
import './AuthPage.scss'
import { Link } from 'react-router-dom'

type AuthPageProps = {}

const AuthPage: React.FC<AuthPageProps> = () => {

    const [formType, setFormType] = useState<'login' | 'register'>('login')

    return (
        <div className="auth">
            <div className="container">
                <div className="auth__body">
                    <p className="auth__form-title">
                        {
                            formType === 'login'
                                ? 'Вход'
                                : 'Регистрация'
                        }
                    </p>
                    {
                        formType === 'login'
                            ? <AuthForm />
                            : <RegisterForm />
                    }
                    <p className="auth__change-link">
                        {
                            formType === 'login'
                                ? 'Еще нет аккаунта? '
                                : 'Уже есть аккаунт? '
                        }
                        {
                            formType === 'login'
                                ? <Link
                                    to="#"
                                    onClick={() => setFormType('register')}
                                >
                                    Регистрация
                                </Link>
                                : <Link
                                    to="#"
                                    onClick={() => setFormType('login')}
                                >
                                    Войти
                                </Link>
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage