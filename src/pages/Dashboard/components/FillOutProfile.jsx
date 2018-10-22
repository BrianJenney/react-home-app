import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import PicPreview from "../../AddProperty/components/PicPreview";
import "../../../styles/FillOutProfile.css";
import API from "../../../api/helpers.js";

class FillOutProfile extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            collapse: false,
            phoneNumber: "",
            file: null,
            form: new FormData(),
            imgs: []
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        API.getHome(this.props.userEmail).then(res => {
            const updateObj = res.data.user.userPic
                ? { imgs: [res.data.user.userPic] }
                : {};
            this.setState(
                Object.assign(
                    {
                        phoneNumber: res.data.user.phoneNumber || ""
                    },
                    updateObj
                )
            );
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = files => {
        files.forEach(file => {
            this.setState({ file, imgs: [file] });
        });

        this.updateProfile();
    };

    handleChange = e => {
        this.setState({ phoneNumber: e.target.value });
    };

    updateProfile = () => {
        this.state.form.set("file", this.state.file);
        this.state.form.set("phoneNumber", this.state.phoneNumber);
        this.state.form.set("userEmail", this.props.userEmail);
        API.updateProfile(this.state.form).then(() => {
            this.setState({ collapse: false });
        });
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">2</h1>
                    <span className="section-title">Fill Out Your Profile</span>
                    <span
                        className={
                            this.state.collapse
                                ? "fa fa-2x fa-angle-up pl-4"
                                : "fa fa-2x fa-angle-down pl-4"
                        }
                        onClick={this.toggle}
                    />
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="ml-4">
                        <h5 className="blue">Things Left To Do...</h5>
                        <input
                            type="checkbox"
                            checked={this.state.imgs.length}
                            className="d-inline m-2 ml-0"
                        />
                        <p className="paragraph d-inline">
                            {" "}
                            Upload your profile photo{" "}
                            <span className="purple">
                                (this will only be shown to buyers if you reply
                                to a message they send you)
                            </span>
                        </p>
                        <br />
                        {this.state.imgs.length < 1 && (
                            <Dropzone
                                className="dropzone w-25 h-25 m-2"
                                onDrop={this.handleDrop}
                                multiple
                                accept="image/*"
                            >
                                <div className="upload-actions text-center">
                                    <FloatingActionButton mini className="mt-3">
                                        <ContentAdd />
                                    </FloatingActionButton>
                                    <br />
                                    <small className="text-primary">
                                        Upload Profile Pic
                                    </small>
                                </div>
                            </Dropzone>
                        )}

                        <div className="pic-preview ml-4">
                            <img src={this.state.imgs[0]} alt="" />
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={this.state.phoneNumber}
                            className="d-inline m-2 ml-0"
                        />
                        <i className="lightGrey fa fa-pencil d-inline" />
                        <input
                            onChange={this.handleChange.bind(this)}
                            type="phone"
                            className="dyanmic-input-size d-inline borderless"
                            placeholder={
                                this.state.phoneNumber ||
                                "Add your phone number"
                            }
                        />
                        <span className="purple">
                            {" "}
                            (this will only be shown to buyers after you approve
                            their offer)
                        </span>
                        <br />

                        <button
                            onClick={this.updateProfile}
                            className="d-inline btn btn-default"
                        >
                            <span className="text-primary">
                                Add Phone Number
                            </span>
                        </button>
                    </div>
                </Collapse>
            </div>
        );
    }
}
export default FillOutProfile;
