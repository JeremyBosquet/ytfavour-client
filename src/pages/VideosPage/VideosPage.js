import React, { useState, useEffect } from 'react'
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import { DisplayVideoInVideos } from '../../components/Display/DisplayVideo'
import instance from '../../api/instance';
import axios from 'axios';
import './VideosPage.scoped.css'

export default function VideosPage(props) {

    const [loaded, setLoaded] = useState();
    const [videos, setVideos] = useState([]);
    // eslint-disable-next-line
    const [videoId, setVideoID] = useState("");
    const [videoFrom, setVideoFrom] = useState(1);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        renderVideos()
    }, [response])

    const renderVideos = async () => {
        try {
            let res = await axios.get('https://ytfavour.herokuapp.com/api/videos');
            let videos = res.data;

            setVideos(
                videos.map((video, _id) => (
                    <DisplayVideoInVideos key={_id} {...video} />
                ))
            )

            setLoaded(true)

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = async () => {
            const response = await instance.get('/profil');
            if (response){
                setData(response.data)
            }
        } 
        request()
        if (videoId) {
            setVideoID("")
            await instance.post('/videos', {
                videoId: videoId,
                username: data.pseudo,
                video_from: videoFrom
            }).then((response) => {
                if (response) {
                    setResponse("La vidéo a bien été ajouté !")
                } else {
                    setResponse("Une erreur s'est produite.")
                }
            }
            ).catch(error => {
                console.log(error)
            })

        }

    }

    return (
        <>
            <div className="page" data-theme={props.dataTheme}>

                <Helmet>
                    <title>YTFavour - Vidéos</title>
                </Helmet>
                <Header switchTheme={props.switchTheme}/>
                <section className="add_videos">
                    <h3>Ajouter une vidéo:</h3>
                    { localStorage.getItem('logged') === 'true' ?
                        <form onSubmit={handleSubmit} className="add_video">
                            <input type="text" onChange={e => setVideoID(e.target.value)} value={videoId} placeholder="Lien de la vidéo" />
                            <select onChange={e => setVideoFrom(e.target.value)} defaultValue="1" className="input">
                                <option value="1">Youtube</option>
                                <option value="2" disabled>Autre</option>
                            </select>
                            <button type="submit">Ajouter :)</button>
                            <p>{response}</p>
                        </form> 
                    : 
                        <p>Veuillez vous connecter <Link to="/login">ici</Link> pour ajouter une vidéo.</p>}
                </section>

                {loaded ?
                    <section className="videos">
                        {Object.keys(videos).length > 0 ? videos : <h3>Aucune vidéo n'a été trouvé.</h3>}
                    </section>
                :   
                    <section className="videos">
                        <section className="contentVideoPage">
                            <h1><span className="loading">Chargement...</span></h1>
                        </section>
                    </section>
                }
                <Footer />
            </div>
        </>
    )
}
