import React, { Component } from "react";
import "../../../styles/picPreview.css";

class PicPreview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pic-previews">
                {this.props.pics.map((file, idx) => {
                    return (
                        <div className="preview-pic" key={idx}>
                            <span
                                className="fa fa-remove"
                                onClick={this.props.removePic.bind(this, idx)}
                            />
                            <img src={file.preview} alt={file.name} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default PicPreview;
