import { Button, Input } from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/reducers/rootReducer'
import { UserState } from '../../../store/reducers/UserReducer'
import { CreateGloballMessage } from '../../../types/requestTypes'
import * as Yup from 'yup'
import './Chat.scss'
import { getCookie } from '../../../utils/cookie'
import { AccessTokenName } from '../../../config'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { GlobalMessage } from '../../../types/state'
import { AllGlobalMessageResp } from '../../../types/responseTypes'

interface ChatProps extends RouteComponentProps {

}

const MessageSchema = Yup.object().shape({
    message: Yup.string()
        .min(1, 'Сообщение не должно быть пустым')
        .max(255, 'Максимум 255 символов')
        .required('Сообщение не должно быть пустым')
})

const Chat: React.FC<ChatProps> = ({ history, location }) => {

    const user = useSelector<RootState>(state => state.user) as UserState
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState<GlobalMessage[]>([])

    const formik = useFormik({
        initialValues: { message: '' },
        validationSchema: MessageSchema,
        onSubmit: async values => {
            const message: CreateGloballMessage = {
                userId: user.id,
                created_at: Date.now(),
                text: values.message,
            }
            const createData = {
                type: 'add_message',
                data: message
            }
            if (ws) ws.send(JSON.stringify(createData))
        }
    })

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3333/global_chat')
        const openData = {
            type: 'auth',
            data: {
                Authorization: getCookie(AccessTokenName)
            }
        }
        const allMessagesData = { type: 'all_messages' }
        ws.onopen = (e) => {
            ws.send(JSON.stringify(openData))
            setWs(ws)
            ws.send(JSON.stringify(allMessagesData))
        }
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data) as AllGlobalMessageResp

            switch (data.type) {
                case ('all_messages'): {
                    setMessages(data.data)
                    break
                }
                case ('added_message'): {
                    setMessages(messages => [...messages, data.data])
                }
            }
        }
        ws.onclose = (e) => {
            console.log('closed', e.reason)
            history.push('/profile')
        }
    }, [])

    console.log('MESSAGES', messages);


    return (
        <div className="chat">

            <div className="chat__body">
                {
                    messages.map(m => {
                        const isMineMessage = m.user?._id === user.id
                        return (
                            <div className={isMineMessage ? "chat__message-item" : "chat__message-item friend"}>
                                <div className="chat__message-user">
                                    <div className="chat__message-avatar">
                                        <img src={user?.image} alt="avatar" />
                                    </div>
                                    <p className="chat__message-time">{ m.created_at }</p>
                                </div>

                                <div className="chat__message-body">
                                    <p className="chat__message-text">{ m.text }</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat__footer">
                <form onSubmit={formik.handleSubmit} className="chat__input-field">
                    <Input
                        name="message"
                        placeholder="Введите сообщение"
                        value={formik.values.message}
                        className="chat__input-message"
                        onChange={formik.handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Отправить
                    </Button>
                    <p className="chat__message-error">{formik.errors.message}</p>
                </form>
            </div>

        </div>




    )
}

export default withRouter(Chat)