import React, {useState, useEffect} from 'react'
import {Helmet} from "react-helmet";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

import './Table.scoped.scss'
import instance from '../../api/instance';
import axios from 'axios';

export default function AdminPage(props) {
    let navigate = useNavigate()
    const [loaded, setLoaded] = useState(false);
    const [grade, setGrade] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('logged') !== 'true'){
            navigate('/account');
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

    const changeGrade = (event, id) => {
        event.preventDefault();

        if (id) {
            axios.post('https://ytfavour.herokuapp.com/api/user/grade', {
                id: id,
                grade: event.target.value
            }).then(response => {
                setGrade(grade)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const [users, setUsers] = useState([]);
    const [define, setDefine] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('logged') === 'true')
        {
            if (!define)
            {
                renderUsers()
                setDefine(true)
            }
        }
    // eslint-disable-next-line
    }, [define, grade])
    
    const renderUsers = async () => {
        try {
            let res = await axios.get('https://ytfavour.herokuapp.com/api/users');
            let all_users = res.data;

            setUsers(
                all_users.map((req, _id) => (
                    <DisplayUser key={_id} {...req} />
                ))
            )
            
            setLoaded(true)

        } catch (err) {
            console.log(err);
        }
    }

    const DisplayUser = (props) => {

        let date = props.date
        const dateLocale = new Date(date).toLocaleDateString('fr-FR')
    
        const deleteUser = (e, id) => {
            e.preventDefault()
            axios.delete('https://ytfavour.herokuapp.com/api/users/delete', {
                data: {
                    id: id
                }
            }).then(res => {
                setDefine(false)
            })
        }

        return (
            <>
               <div className="page" data-theme={props.dataTheme}>
                   <tr>
                        <td data-label="Pseudo">{props.pseudo}</td>
                        <td data-label="Inscrit le">{dateLocale}</td>
                        <td data-label="Grade">
                            <select onChange={e => changeGrade(e, props._id)} defaultValue={props.grade} className="input">
                                <option value="3">Admin</option>
                                <option value="0">Utilisateur</option>
                            </select>
                        </td>
                        <td data-label="Actions">
                            <form onSubmit={e => deleteUser(e, props._id)}>
                                <button className="user_del" type="submit">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                </div>
            </>
        )
    }
    
    if (data.grade < 3)
        navigate('/account');
    return (
        <>
         {/* <div className="page" data-theme={props.dataTheme}> */}
            <Helmet>
                <title>YTFavour - Administration</title>
            </Helmet>
            <div className="accountPage">
                <div className="page">
                    <Header switchTheme={props.switchTheme} />
                    <div className="content-page">
                        <div className="content">
                            <h2><span>Administration</span></h2>
                        </div>
                        <div className="content">
                            <main>
                                <table>
                                    <caption>Utilisateurs</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Pseudo</th>
                                            <th scope="col">Inscrit le</th>
                                            <th scope="col">Grade</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    {
                                        loaded ?
                                            <tbody>
                                                {users}
                                            </tbody>
                                        :
                                        <tbody>
                                            <tr>
                                                <td data-label="Pseudo"><span className="loading">Chargement...</span></td>
                                                <td data-label="Inscrit le"><span className="loading">Chargement...</span></td>
                                                <td data-label="Grade">
                                                    <span className="loading">Chargement...</span>
                                                </td>
                                                <td data-label="Actions">
                                                    <span className="loading">Chargement...</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        {/* </div> */}
        </>
    )
}