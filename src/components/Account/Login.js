import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import instance from '../../api/instance';

export default function LoginPage() {
    let navigate = useNavigate();

    //State pour afficher ou pas le mot de passe
    const [viewPassword, setViewPassword] = useState(true)

    //State pour les données entrée dans le form
    const [pseudo, setPseudo] = useState("")
    const [password, setPassword] = useState("")

    // State pour afficher les erreurs et success de connection
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Changement du type d'input du password
    const togglePassword = (event) => {
        event.preventDefault()
        setViewPassword(!viewPassword)
    }

    useEffect(() => {
        if (localStorage.getItem('logged') === 'true'){
            navigate('/account');
        }
    // eslint-disable-next-line
    }, [])

    // Verification et connection quand submit
    const submitForm = async (event) => {
        event.preventDefault()

        if (pseudo && password) {
            instance.post('/login', {
                pseudo: pseudo,
                password: password,
            }).then((response) => {
                if (response.status === 200)
                {
                    setError("")
                    setSuccess("Connexion effecuté, redirection...");
                    instance.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
                    localStorage.setItem('user', response.data.refreshToken)
                    localStorage.setItem('logged', true)
                    navigate('/account');
                } else if (response.status === 401) {
                    //Ont averti le client que la connexion n'a pas fonctionné
                    setError("Erreur: pseudo inconnu.")
                    setSuccess(null)
                } else if (response.status === 402) {
                    //Ont averti le client que la connexion n'a pas fonctionné
                    setError("Erreur: mot de passe invalide.")
                    setSuccess(null)
                }
            }).catch((err) => {
                setSuccess("")
                setError("Identifiants invalides.");
            })
        } else {
            setError("Erreur: un champ est manquant.")
        }
    }

    //HTML
    return (
        <>
            <div className="sign-container">
                <div className="sign-content">
                    <h2>Connexion</h2>
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
                        <input type="submit" value="Se connecter" className="login-btn" />

                    </form>
                </div>
            </div>
        </>
    )
}