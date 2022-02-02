import React, { Component } from "react";
import domtoimage from 'dom-to-image';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave, faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class Home extends Component {
    state = {
        topText: "",
        bottomText: "",
        allMemeImgs: [],
        randomImg: localStorage.getItem("url") ? localStorage.getItem("url") : "http://i.imgflip.com/1bim.jpg",
        color: "#ffffff",
        textstyle: { color: 'white' },
        save: false
    };
    componentDidMount() {
        const token = sessionStorage.getItem('Auth Token');
        if (!token) {
            window.location.href = "/login";
        }
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((content) => {
                this.setState({
                    allMemeImgs: content.data.memes
                })
            }
            );
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

        if (name === "color") {
            this.setState({ textstyle: { color: value } })
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { allMemeImgs } = this.state;
        const rand =
            allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
        this.setState({
            randomImg: rand,
            bottomText: "",
            topText: ""
        });
    };

    handleSave = async (event) => {
        event.preventDefault();
        this.setState({ save: false });
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
        let fl = 0;
        domtoimage.toJpeg(document.getElementById('he'))
            .then(async function (dataUrl) {
                db.collection(email).add({
                    url: dataUrl
                })

            })
            .catch(function (error) {
                fl = 1;
                console.error('oops, something went wrong!', error);
            });
        if (fl === 0)
            this.setState({ save: true })
    };

    handleshareSubmit = async (event) => {
        event.preventDefault();
        domtoimage.toJpeg(document.getElementById('he'))
            .then(async function (dataUrl) {
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
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    handledownloadSubmit = async (event) => {
        domtoimage.toJpeg(document.getElementById('he'))
            .then(async function (dataUrl) {
                const image = await fetch(dataUrl);
                const blob = await image.blob();
                var element = document.createElement("a");
                element.href = URL.createObjectURL(blob);
                element.download = "image.jpg";
                element.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    render() {
        return (
            <div>
                <Nav />
                <div className="grid-container">
                    <div>
                        <form className="meme-form" onSubmit={this.handleSubmit}>
                            <p className="inputlabel">Top Text</p>
                            <input
                                placeholder="Top text"
                                type="text"
                                value={this.state.topText}
                                name="topText"
                                onChange={this.handleChange}
                            />
                            <p className="inputlabel">Bottom Text</p>
                            <input
                                placeholder="Bottom Text"
                                type="text"
                                value={this.state.bottomText}
                                name="bottomText"
                                onChange={this.handleChange}
                            />


                        </form>
                        <div>
                            <p className="colortext">Text Color: <input type="color" name="color" value={this.state.color} onChange={this.handleChange}></input></p>
                        </div>
                        <div className="butdiv">
                            <div className="downbut" onClick={this.handledownloadSubmit}>Download <FontAwesomeIcon icon={faDownload} /></div>
                            <div className="downbut" onClick={this.handleshareSubmit}>Share <FontAwesomeIcon icon={faShareAltSquare} className="icon" /></div>
                        </div>
                        <button className="genbut genbut2" onClick={this.handleSave}>Save <FontAwesomeIcon icon={faSave} /></button>
                        {
                            this.state.save ? <span className="savespan">Saved!</span> : <></>
                        }
                        <button className="genbut" onClick={this.handleSubmit}>Generate a random meme</button>
                    </div>
                    <div>
                        <div id='he'>
                            <div className="meme">
                                <img src={this.state.randomImg} alt="meme" />
                                <h2 className="top" style={this.state.textstyle}>{this.state.topText}</h2>
                                <h2 className="bottom" style={this.state.textstyle}>{this.state.bottomText}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
