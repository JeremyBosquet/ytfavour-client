import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import instance from '../../api/instance';

export default function RegisterPage() {
    let navigate = useNavigate();
    //State pour afficher ou pas le mot de passe
    let [viewPassword, setViewPassword] = useState(true)

    //State pour les données entrée dans le form
    const [pseudo, setPseudo] = useState("")
    const [password, setPassword] = useState("")

    //State pour les messages d'infos
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Changement du type d'input du password
    const togglePassword = (event) => {
        event.preventDefault();
        setViewPassword(!viewPassword)
    }

    useEffect(() => {
        if (localStorage.getItem('logged') === 'true'){
            navigate('/account');
        }
    // eslint-disable-next-line
    }, [])

    // Verification et connection quand submit
    const submitForm = (event) => {
        event.preventDefault()
        if (pseudo && password) {
            instance.post('/register', {
                pseudo: pseudo,
                password: password
            }).then((res) => {
                if (res.data.response === 1) {

                    //Ont averti le client que la connexion a bien été effectué
                    setSuccess("Vous avez bien été enregistré.")
                    setError(null)

                    setPseudo("")
                    setPassword("")

                } else {

                    //Ont averti le client que l'enregistrement n'a pas fonctionné
                    setError(res.data.message)
                    setSuccess(null)
                }
            })
        } else {
            setError("Erreur: un champ est manquant.")
        }
    }

    return (
        <>
            <div className="sign-container">
                <div className="sign-content">
                    <h2>Inscription</h2>

                    {
                        success ?
                            <p className="info-success">{success}</p>
                        :
                            <p></p>
                    }
                    {
                        error ?
                            <p className="info-error">{error}</p>
                        :
                            <p></p>
                    }

                    <form onSubmit={submitForm}>

                        <input 
                            value={pseudo}
                            onChange={e => setPseudo(e.target.value)} 
                            type="text" 
                            placeholder="Pseudo"
                            required/>
                        <div className="password">
                            <input 
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                                type={viewPassword ? "password" : "text"} 
                                placeholder="Mot de passe" 
                                required/>
                            <span className="view-password" id="view-password" onClick={togglePassword} >Voir</span>
                        </div>
                        <input type="submit" value="S'inscrire" className="login-btn" />

                    </form>
                </div>
            </div>
        </>
    )
}
