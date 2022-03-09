import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import './VideoPage.scoped.scss'


export default function VideoPage(props) {
    let navigate = useNavigate();
    const { id } = useParams();
    const [video, setVideo] = useState({});
    const [mount, setMount] = useState(false);
    
    useEffect(() => {
        if (!mount)
        {
            axios.post('https://ytfavour.herokuapp.com/api/video', {
                url: id
            }).then((res) => {
                setVideo(res.data)
                setMount(true)
            })
        }
    })

    if (!video){
        navigate('/videos');
    }

    let date = video.date
    const dateLocale = new Date(date).toLocaleDateString('fr-FR')

    return (
        <>
            <div className="page" data-theme={props.dataTheme}>
                <Helmet>
                    <title>{`YTFavour - de ` + video.username}</title>
                </Helmet>
                <Header switchTheme={props.switchTheme} />
                <section className="contentVideoPage">
                    <div>
                        <iframe src={video.video_iframe} frameBorder="0" className="videoInPage" scrolling="no" title={video.title} allowFullScreen></iframe>
                        <h1>{video.title}</h1>
                    </div>
                    <div>
                        <p>Auteur: <span><a href={"https://www.youtube.com/channel/" + video.channelId} target="_blank" rel="noreferrer">{video.author}</a></span></p>
                        <p>Vues: <span>{video.views}</span></p>
                        <p>Ajouté le : <span>{dateLocale}</span> par <span><Link to={"/user/" + video.username}>{video.username}</Link></span></p>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}