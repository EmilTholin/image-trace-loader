import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {
  src,
  trace
} from "!!image-trace-loader?color=#DB7093&background=#FFF!./images/bridesmaid.png";
import homer from "./images/homer.gif";
import hercules from "./images/hercules.jpg";
import mountain from "!!image-trace-loader?color=#BBCBD1&background=#FFF!./images/mountain.jpg";

class Img extends Component {
  state = { imageLoaded: false };

  setImageLoaded = () => {
    var delay = 500 + Math.random() * 1500;
    setTimeout(() => this.setState({ imageLoaded: true }), delay);
  };

  render() {
    return (
      <div className="image-wrapper">
        <img src={this.props.trace} />
        <img
          src={this.props.src}
          className={`image ${this.state.imageLoaded && `loaded`}`}
          onLoad={this.setImageLoaded}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Img src={src} trace={trace} />
    <Img {...homer} />
    <Img {...hercules} />
    <Img {...mountain} />
  </div>,
  document.getElementById("app")
);
