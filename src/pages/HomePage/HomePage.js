import React from 'react'
import {Helmet} from "react-helmet";
import Header from '../../components/Header/Header'
import './HomePage.scoped.css'

export default function HomePage(props) {
    return (
        <>
            <div className="page" data-theme={props.dataTheme}>
                <Helmet>
                    <title>YTFavour - Accueil</title>
                </Helmet>
                <Header switchTheme={props.switchTheme} />
            </div>
        </>
    )
}
