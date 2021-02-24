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
import { RootState } from "../store/reducers/rootReducer"
import { Roles } from "../types/redux"


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

                    <Route path="/games" exact component={GameListPage} />
                    <Route path="/games/:access" exact component={GameListPage} />


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