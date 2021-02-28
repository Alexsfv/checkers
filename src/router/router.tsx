import { CircularProgress } from "@material-ui/core"
import { useSelector } from "react-redux"
import { Switch } from "react-router-dom"
import { Redirect, Route } from "react-router-dom"
import MainLayout from "../Components/auth/Layouts/MainLayout/MainLayout"
import AboutPage from "../Pages/AboutPage/AboutPage"
import AuthPage from "../Pages/AuthPage/AuthPage"
import MainPage from "../Pages/MainPage/MainPage"
import ProfilePage from "../Pages/ProfilePage/ProfilePage"
import GameListPage from '../Pages/GameListPage/GameListPage'
import GamePage from '../Pages/GamePage/GamePage'
import { RootState } from "../store/reducers/rootReducer"
import { Roles } from "../types/redux"
import ChatPage from "../Pages/ChatPage/ChatPage"


export const MainRouter = () => {
    const roles = useSelector<RootState>(state => state.user.roles) as Roles[] | null

    const isUser = roles?.includes('user')
    const isLogout = roles?.length === 0

    if (isUser) {
        return (
            <MainLayout>
                <Switch>
                    <Route path="/main" exact component={MainPage} />
                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/about" exact component={AboutPage} />

                    <Route path="/game/:id" exact component={GamePage} />

                    <Route path="/games" exact component={GameListPage} />
                    <Route path="/games/:access" exact component={GameListPage} />

                    <Route to="/chat" exact component={ChatPage} />

                    <Redirect to="/main" />
                </Switch>
            </MainLayout>
        )
    }
    if (isLogout) {
        return (
            <Switch>
                <Route path="/auth" exact component={AuthPage} />
                <Redirect to="/auth" />
            </Switch>
        )
    }
    return (
        <div className="auth-loader">
            <CircularProgress />
        </div>
    )
}