import React, { Component } from "react";
import Nav from "./Nav";

class Gallary extends Component {
    state = {
        allMemeImgs: []
    };
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((content) => {
                this.setState({
                    allMemeImgs: content.data.memes
                })
            }
            );
    }
    onClick = (e) => {
        localStorage.setItem("url", e);
        window.location.href = "/meme";
    }

    render() {
        return (
            <div>
                <Nav />
                <p className="gallaryhead">Choose a Meme Template</p>
                {
                    this.state.allMemeImgs && this.state.allMemeImgs.map((value) => (
                        <div className="gallarydiv" onClick={(e) => this.onClick(value.url)}>
                            <img src={value.url} className="gallaryimg" alt=""></img>
                            <p className="gallaryname">{value.name}</p>
                        </div>
                    ))
                }
            </div>
        )
    };
}

export default Gallary;
