import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from "../assets/logo.png";
import Modal from 'react-bootstrap/Modal'
import * as Icon from 'react-bootstrap-icons';

const Post = () => {
    const [lgShow, setLgShow] = useState(false);
    const [cgShow, setCgShow] = useState(false);
    const [smShow, setSmShow] = useState(false);



    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState('');
    const [comments, setComments] = useState([]);
    const [tags, setTags] = useState([]);

    const BASE_URL = 'https://dummyapi.io/data/api';
    const APP_ID = '6064931049eb880c0943654e';

    useEffect(() => {
        axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })
            .then(response => {
                const p = response.data;
                setPosts(p.data)
            })
            .catch(console.error);
    }, []);

    const getProfile = (idUser) => {
        axios.get(`${BASE_URL}/user/${idUser}`, { headers: { 'app-id': APP_ID } })
            .then(response => {
                const p = response.data;
                setProfile(p)
            })
            .catch(console.error);
    }

    const getComments = (postId) => {
        axios.get(`${BASE_URL}/post/${postId}/comment`, { headers: { 'app-id': APP_ID } })
            .then(response => {
                const p = response.data;
                setComments(p.data)
            })
            .catch(console.error);

    }
    const filterHashtags = (tagTitle) => {
        axios.get(`${BASE_URL}/tag/${tagTitle}/post`, { headers: { 'app-id': APP_ID } })
            .then(response => {
                const p = response.data;
                setPosts(p.data)
            })
            .catch(console.error);
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >
                        <img src={logo} alt="" width="80" height="24" className="d-inline-block align-text-top"></img>
                    </a>
                </div>
            </nav>

            <div className="container mt-5 Fondo">
                <div className="row">
                    {posts.map((post) => (
                        <div className="col my-2" key={post.id}>
                            <div className="card" style={{ width: '18rem', height: '100%' }}>
                                <div className="card-header">
                                    <h3 style={{ cursor: 'pointer' }} onClick={() => { getProfile(post.owner.id); setLgShow(true) }}>{post.owner.firstName + " " + post.owner.lastName}</h3>
                                </div>
                                <div style={{ width: '18rem', height: '150px' }}>
                                    <img src={post.image} className="card-img-top" alt="..." style={{ objectFit: 'cover', width: '18rem', height: '100%' }}></img>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-justify">{post.text}</p>
                                    <a href={post.link} className="btn btn-link" style={{ maxWidth: '250px' }}>{post.link}</a>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p className="card-text" style={{ cursor: 'pointer' }}><Icon.HeartFill />  <small className="text-muted" onClick={() => { getComments(post.id); setCgShow(true) }}>{post.likes}</small></p>
                                        </div>
                                        <div className="col-md-8">
                                            <p className="card-text"><small className="text-muted">{post.publishDate}</small></p>
                                        </div>
                                    </div>
                                    <p className="card-text" onClick={() => setSmShow(true)}><small className="text-muted">{post.message}</small></p>
                                </div>
                                <div className="card-footer text-muted">
                                    <a style={{ cursor: 'pointer' }} onClick={() => filterHashtags(post.tags[0])}>#{post.tags[0]} </a>
                                    <a style={{ cursor: 'pointer' }} onClick={() => filterHashtags(post.tags[0])}>#{post.tags[1]} </a>
                                    <a style={{ cursor: 'pointer' }} onClick={() => filterHashtags(post.tags[0])} >#{post.tags[2]} </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Perfil del Autor</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <img src={profile.picture} className="card-img-top" alt="..."></img>
                        </div>
                        <div className="col">
                            <p className="card-text"><small className="text-muted"><strong>TITULO:</strong> {profile.title}</small></p>
                            <p className="card-text"><small className="text-muted"><strong>NOMBRE:</strong> {profile.firstName + " " + profile.lastName}</small></p>
                            <p className="card-text"><small className="text-muted"><strong>EMAIL:</strong>  {profile.email}</small></p>
                            <p className="card-text"><small className="text-muted"><strong>GENERO:</strong> {profile.gender}</small></p>
                        </div>
                        <div className="col">
                            <p className="card-text"><small className="text-muted"><strong>FECHA DE NACIMIENTO:</strong>  {profile.dateOfBirth}</small></p>
                            <p className="card-text"><small className="text-muted"><strong>FECHA DE REGISTRO:</strong> {profile.registerDate} </small></p>
                            <p className="card-text"><small className="text-muted"><strong>TEL&Eacute;FONO:</strong>  {profile.phone}</small></p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={cgShow}
                onHide={() => setCgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Comentarios</h3>
                    </Modal.Title>
                </Modal.Header>
                {comments.map((comment) => (
                    <Modal.Body>
                        <div className="row">
                            <div className="col" key={comment.id}>
                                <div className="container">
                                    <div className="row">
                                        <div >
                                            <img src={comment.owner.picture} className="rounded-circle" alt="..." style={{ objectFit: 'cover', width: '3rem', height: '100%' }}></img>
                                        </div>
                                        <div className="col .offset-md-3">
                                            <h4>{comment.owner.firstName + " " + comment.owner.lastName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <p className="card-text"><small className="text-muted"><strong>FECHA DE PUBLICACI&Oacute;N:</strong> {comment.publishDate}</small></p>
                                <p className="card-text"><small className="text-muted"><strong>MENSAJE:</strong> {comment.message}</small></p>
                            </div>
                        </div>
                    </Modal.Body>
                ))}
            </Modal>
        </div>
    );
}
export default Post;

