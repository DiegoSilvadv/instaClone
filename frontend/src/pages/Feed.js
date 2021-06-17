import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import { FiMoreHorizontal, FiHeart, FiMessageCircle, FiNavigation } from 'react-icons/fi';

import './Feed.css';

class Feed extends Component {

    state = {
        feed: [],
    }

    // carrega todas informacoes ao inciar o component
    async componentDidMount(){
        this.registerToSocket();
        const response = await api.get('posts');
        
        this.setState({ feed: response.data });
    }

    registerToSocket = () => {

        const socket = io('http://localhost:3333');
       
        // pegando novo post colocando na primeira posição do array e em seguida os demais posts
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        socket.on('like', likePost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likePost._id ? likePost : post
                )
            })
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }
    
    render() {
        
        return (
            <section id="post-list">
                { this.state.feed.map(post=>(
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <FiMoreHorizontal size={20} color="black" />
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`}alt="teste"/>
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <FiHeart className="icons" size={20} color="black" />
                            </button>
                            <FiMessageCircle className="icons" size={20} color="black" />
                            <FiNavigation className="icons" size={20} color="black" />
                        </div>  

                        <strong>{post.likes}</strong>   
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>               
                    </footer>
                </article>
                )) }
            </section>
        )
    }
}

export default Feed;