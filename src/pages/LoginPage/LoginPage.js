import React from 'react'
import {Helmet} from "react-helmet";
import Header from '../../components/Header/Header'
import Login from '../../components/Account/Login'
import Register from '../../components/Account/Register'
import './LoginPage.scoped.scss'

export default function LoginPage(props) {
    return (
        <>
            <div className="page" data-theme={props.dataTheme}>
                <Helmet>
                    <title>YTFavour - Connexion</title>
                </Helmet>
                <Header switchTheme={props.switchTheme} />
                <section className="loginPage">
                    <div className="row">
                        <Login />
                        <Register />
                    </div>
                </section>
            </div>
        </>
    )
}