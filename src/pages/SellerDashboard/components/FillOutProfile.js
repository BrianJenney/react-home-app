import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import PicPreview from "../../AddProperty/components/PicPreview";
import "../../../styles/FillOutProfile.css";
import API from "../../../api/helpers.js";
import { updateLocale } from "moment";

class FillOutProfile extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            collapse: false,
            phoneNumber: "",
            file: null,
            form: new FormData(),
            profilePic: ""
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        API.userInfo(this.props.user._id).then(res => {
            this.setState({
                phoneNumber: res.data.phoneNumber || "",
                profilePic: res.data.userPic || ""
            });
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = files => {
        files.forEach(file => {
            this.state.form.set("file", file);
        });

        this.updateProfile();
    };

    handleChange = e => {
        this.setState({ phoneNumber: e.target.value });
    };

    updateProfile = () => {
        this.state.form.set("phoneNumber", this.state.phoneNumber);
        this.state.form.set("userEmail", this.props.userEmail);
        API.updateProfile(this.state.form).then(res => {
            this.setState({
                profilePic: res.data.userPic || ""
            });
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
                            disabled
                            checked={this.state.profilePic.length}
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
                        {this.state.profilePic.length < 1 && (
                            <Dropzone
                                className="dropzone w-25 h-25 m-2"
                                onDrop={this.handleDrop}
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
                            <img
                                style={{ width: 50 }}
                                src={this.state.profilePic}
                                alt=""
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            disabled
                            checked={this.state.phoneNumber}
                            className="d-inline m-2 ml-0"
                        />
                        <i className="lightGrey fa fa-pencil d-inline" />
                        <input
                            onChange={this.handleChange.bind(this)}
                            type="phone"
                            className="dyanmic-input-size d-inline borderless"
                            value={this.state.phoneNumber || null}
                            placeholder="Add your phone number"
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
