import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import axios from 'axios'

import './UserPage.scss'
import '../../components/Display/DisplayVideo.scss'
export default function UserPage(props) {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [mount, setMount] = useState(false);
    const [videos, setVideos] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!mount)
        {
            axios.post('https://ytfavour.herokuapp.com/api/user', {
                user: id
            }
            ).then((res) => {
                if (res.data)
                {
                    setUser(res.data)
                    setMount(true)
                    renderVideos()
                }
                else
                {
                   navigate('/');
                }
            })
        }
    })

    const renderVideos = async () => {
        try {
            
            let videos = user.videos;

            setVideos(
                videos.map((video, _id) => (
                    <DisplayAccount key={_id} {...video} />
                ))
            )
            setLoaded(true)
            

        } catch (err) {
            console.log(err);
        }
    }

    const DisplayAccount = (props) => {

        let date = props.date
        const dateLocale = new Date(date).toLocaleDateString('fr-FR')
    
        let pornstars = props.ph_pornstars
    
        if (pornstars === "No Data"){
            pornstars = <a href={"https://fr.pornhub.com/model/" + props.ph_author} target="_blank" rel="noreferrer">{props.ph_author}</a>
        }

        return (
            <div className="displayAccount" id={props._id}>
                <Link to={"/video/" + props.url}><img className="video account_video" src={props.thumb} alt="Miniature de la vidéo"/></Link>
                <div>
                    <p className="video_title"><Link to={"/video/" + props.url}><span>{props.title}</span></Link></p>
                    {pornstars !== "" ? <p className="video_desc">Auteur: <span>{props.author}</span></p> : false}
                    <p className="video_desc">Vues: <span>{props.views}</span></p>
                    <p className="video_desc">Ajouté le: <span>{dateLocale}</span></p>
                </div>
            </div>
        )
    }

    let date = user.date
    const dateLocale = new Date(date).toLocaleDateString('fr-FR')    
    return (
        <>
            <div className="page" data-theme={props.dataTheme}>
                <Helmet>
                    <title>{`YTFavour - ` + user.pseudo}</title>
                </Helmet>
                <Header switchTheme={props.switchTheme} />
                <section className="userPage">
                    <div className="content userInfos">
                        <h2>Profil de <span>{user.pseudo}</span></h2>
                        <p>Inscrit depuis le: <span>{dateLocale}</span></p>
                    </div>
                    {
                        loaded ? 
                            <div className="content">
                                <h3>Vidéos ajouté ({user.videos.length}):</h3>
                                {Object.keys(videos).length !== 0 ? videos : <p>Cet utilisateur n'a posté aucune vidéo pour le moment.</p>}
                            </div>
                        :
                            <div className="content">
                                <h3>Vidéos ajouté (?):</h3>
                                <div className="displayAccount">
                                    <span className="loading-video"></span>
                                    <div>
                                        <p className="video_title"><span className="loading">Chargement...</span></p>
                                        <p className="video_desc">Actrice: <span className="loading">Chargement...</span></p>
                                        <p className="video_desc">Durée: <span className="loading">Chargement...</span></p>
                                        <p className="video_desc">Ajouté le: <span className="loading">Chargement...</span></p>
                                        <span className="loading"></span>
                                    </div>
                                </div>                        
                            </div>
                        }
                </section>
                <Footer />
            </div>
        </>
    );
}