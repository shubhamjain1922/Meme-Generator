import React, { Component } from "react";
import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class Saved extends Component {
    state = {
        allMemeImgs: []
    };
    componentDidMount() {
        const token = sessionStorage.getItem('Auth Token');
        if (!token) {
            window.location.href = "/login";
        }

        const firebaseConfig = {
            apiKey: "AIzaSyBaQPCxm_LxZs8m4SqtBshYe0OMGGql-vI",
            authDomain: "meme-generator-123.firebaseapp.com",
            projectId: "meme-generator-123",
            storageBucket: "meme-generator-123.appspot.com",
            messagingSenderId: "478649268100",
            appId: "1:478649268100:web:b3be770e0f7c2312384fd1"
        };
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        const db = firebaseApp.firestore();

        const email = sessionStorage.getItem('Email');

        db.collection(email).onSnapshot((snapshot) => {
            this.setState({
                allMemeImgs: snapshot.docs
            })

        });
    }
    onClick = (e) => {
        localStorage.setItem("url", e);
        window.location.href = "/meme";
    }

    handleshareSubmit = async (e) => {
        const dataUrl = this.state.allMemeImgs[e].data().url;
        const image = await fetch(dataUrl);
        const blob = await image.blob();
        const filesArray = [
            new File(
                [blob],
                'meme.jpeg',
                {
                    type: "image/jpeg"
                }
            )
        ];
        const shareData = {
            files: filesArray,
        };

        try {
            await navigator.share(shareData)
        } catch (err) {
            console.log('Error: ' + err)
        }
    };

    handledownloadSubmit = async (e) => {

        const dataUrl = this.state.allMemeImgs[e].data().url;
        const image = await fetch(dataUrl);
        const blob = await image.blob();
        var element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = "image.jpg";
        element.click();
    };

    render() {
        return (
            <div>
                <Nav />
                <p className="gallaryhead">Your Saved Memes</p>
                {
                    this.state.allMemeImgs && this.state.allMemeImgs.map((value, i) => (
                        <div className="gallarydiv">
                            <img src={value.data().url} className="savedimg" alt=""></img>
                            <div className="savedcover"></div>
                            <div className="savebutdiv">
                                <div className="savedownbut" onClick={() => this.handledownloadSubmit(i)}>Download <FontAwesomeIcon icon={faDownload} /></div>
                                <div className="savedownbut" onClick={() => this.handleshareSubmit(i)}>Share <FontAwesomeIcon icon={faShareAltSquare} className="icon" /></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    };
}

export default Saved;
