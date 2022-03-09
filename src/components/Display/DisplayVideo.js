import React from 'react'
import { Link } from 'react-router-dom'
import "./DisplayVideo.scss"

function DisplayVideoInVideos(props) {

    let date = props.date
    const dateLocale = new Date(date).toLocaleDateString('fr-FR')

    return (
        <div id={props._id}>
            <Link to={"/video/" + props.url}><img className="video" src={props.thumb} alt="Miniature de la vidéo"/></Link>
            <p className="video_time">{props.duration}</p>
            <p className="video_title"><Link to={"/video/" + props.url}><span><b>{props.title}</b></span></Link></p>
            <p className="video_desc">Ajouté par: <span>{ props.username ? <Link to={"/user/" + props.username}>{props.username}</Link> : "inconnu"}</span></p>
            <p className="video_desc">Le: <span>{dateLocale}</span></p>
        </div>
    )
}

export { DisplayVideoInVideos }