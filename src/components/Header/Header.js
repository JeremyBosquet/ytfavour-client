import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import loadUserInfos from '../../api/loadUserInfos'
import './Header.css'

export default function Header(props) {

    useEffect(() => {
        if (localStorage.getItem('logged') !== 'true')
        {
            loadUserInfos();
        }
    }, [])

    return (
        <>
            <h1>YTFavour.</h1>
            <div className="header">
                <Link to="/" className="header_link">Accueil</Link>
                <Link to="/videos" className="header_link">Vidéos</Link>
                {localStorage.getItem('logged') === 'true' ?
                    <Link to="/account" className="header_link">Compte</Link>
                :
                    <Link to="/login" className="header_link">Compte</Link>
                }
            </div>
            <label class="switch" for="checkbox">
                <input type="checkbox" id="checkbox" onClick={props.switchTheme}/>
                <div class="slider round"></div>
            </label>

        </>
    )
}
