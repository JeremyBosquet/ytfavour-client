import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import instance from '../../api/instance';

const Header = () => {
    let navigate = useNavigate();

    // eslint-disable-next-line
    const [mobile, setMobile] = useState(false)
    const [data, setData] = useState([]);
    
    useEffect(() => {
        if (localStorage.getItem('logged') !== 'true'){
            navigate('/login');
        }
        const request = async () => {
            const response = await instance.get('/profil');
            if (response){
                setData(response.data)
            }
        }
        request()
    // eslint-disable-next-line
    }, [])


    // Menu déroulant / Hamburger
    const toggleMobile = (event) => {
        event.preventDefault();

        if(!mobile) {
            document.getElementById('header').style.height = data.grade === 3 ? (70 + (4 * 59) + 'px') : (70 + (3 * 59) + 'px')
            document.getElementById('burger').classList.add('close')
            document.getElementById('burger').classList.remove('burger')
        } else {
            document.getElementById('header').style.height = "70px"
            document.getElementById('burger').classList.remove('close')
            document.getElementById('burger').classList.add('burger')
        }

        // Définir le mode mobile au mode inverse (true/false)
        setMobile(!mobile)

    }
    const log_out = (event) => {
        event.preventDefault();
        localStorage.setItem('logged', false)
        localStorage.removeItem('user')
        instance.defaults.headers.common['authorization'] = `Bearer`
        navigate('/');
    }
    // HTML
    return (
        <>
            <div id="header" className="accountHeader">
                <h2>Mon compte</h2>
                <div id="burger" className="burger" onClick={toggleMobile}/>

                <div className="header-elements">
                    <NavLink className="header-element" to="/" >
                        Retour a l'accueil
                    </NavLink>
                    <NavLink to="/account" end className={({ isActive }) => (isActive ? 'header-element active' : 'header-element')}>
                        Mes vidéos
                    </NavLink>
                    {data.grade === 3
                    ?
                        <NavLink to="/account/admin" end className={({ isActive }) => (isActive ? 'header-element active' : 'header-element')}>
                            Administration
                        </NavLink>
                    :
                        null
                    }
                    <span onClick={event => log_out(event)} className="header-element">
                        <span>Se déconnecter</span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header