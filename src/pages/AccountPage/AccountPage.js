import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'
import './Account.scoped.scss'
import instance from '../../api/instance';
// import axios from 'axios';


export default function AccountPage(props) {
    let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [videos, setVideos] = useState([]);
    const [define, setDefine] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('logged') === 'true')
        {
            if (!define)
            {
                setDefine(true)
                renderVideos()
            }
        } else {
            navigate('/login');
        }
    // eslint-disable-next-line
    }, [define])
    
    const renderVideos = async () => {
        try {
            
            let res = await instance.get('https://ytfavour.herokuapp.com/api/videos/user');
            let videos = res.data;

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
    
        const deleteVideo = (e, id) => {
            e.preventDefault()
            instance.delete('https://ytfavour.herokuapp.com/api/video/delete', {
                data: {
                    id: id
                }
            }).then(res => {
                setDefine(false)
            })
        }

        return (
            <div className="displayAccount" id={props._id}>
                <Link to={"/video/" + props.url}><img className="video account_video" src={props.thumb} alt="Miniature de la vidéo"/></Link>
                <div>
                    <p className="video_title"><Link to={"/video/" + props.url}><span>{props.title}</span></Link></p>
                    <p className="video_desc">Auteur: <span><a href={"https://www.youtube.com/channel/" + props.channelId} target="_blank" rel="noreferrer">{props.author}</a></span></p>
                    <p className="video_desc">Vues: <span>{props.views}</span></p>
                    <p className="video_desc">Ajouté le: <span>{dateLocale}</span></p>
                    <form onSubmit={e => deleteVideo(e, props._id)}>
                        <button className="video_del" type="submit">Supprimer</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="page" data-theme={props.dataTheme}>
                <Helmet>
                    <title>YTFavour - Mon compte</title>
                </Helmet>
                <div className="accountPage">
                    <div className="a-page">
                        <Header switchTheme={props.switchTheme} />
                        <div className="content-page">
                            <div className="content">
                                <h3>YTFavour.</h3>
                            </div>
                            {
                            loaded ? 
                                <div className="content">
                                    <h3>Tes vidéos:</h3>
                                    {Object.keys(videos).length !== 0 ? videos : <p>Tu n'a pas encore ajouté de vidéo.</p>}
                                </div>
                            :
                                <div className="content">
                                    <h3>Tes vidéos:</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
