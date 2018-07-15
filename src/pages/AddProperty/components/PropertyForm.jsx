import React from "react";

import API from "../../../api/helpers.js";
import NavBar from "../../../components/BreadcrumbNav";
import TopNav from "../../../components/TopNav";
import { GoogleApiWrapper } from "google-maps-react";

import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import Dropzone from "react-dropzone";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../../actions/login";
import * as mapActions from "../../../actions/mapMarker";
import EditIcon from "../../../img/icon-edit-small.png";
import PicPreview from "./PicPreview";
import "../../../styles/addProperty.css";

class AddProp extends React.Component {
    constructor() {
        super();
        this.removePic = this.removePic.bind(this);
        const currentYear = new Date().getFullYear();
        this.years = Array.from(
            new Array(70),
            (val, index) => currentYear - index
        );
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.home) {
            this.setState({ ...nextProps.home });
        }
    };

    state = {
        autoComplete: null,
        disabled: false,
        imgs: [],
        price: 0,
        address: null,
        propertyType: null,
        description: null,
        timeFrame: null,
        bedRooms: 0,
        bathRooms: 0,
        sqFeet: 0,
        sqFeetLot: 0,
        yearBuilt: Date.now(),
        form: new FormData(),
        status: null
    };

    removePic = idx => {
        let imgs = [...this.state.imgs];
        imgs.splice(idx, 1);
        this.setState({ imgs });
    };

    handleAddressChange = e => {
        let input = e.target.value;
        this.callAddressAutoComplete(input);
    };

    handleDrop = files => {
        files.forEach(file => {
            this.state.form.append("file", file);
            this.setState({ imgs: [...this.state.imgs, file] });
        });
    };

    callAddressAutoComplete = input => {
        const google = this.props.google;
        let autoComplete = new google.maps.places.Autocomplete(
            document.getElementById("address"),
            { types: ["geocode"] }
        );

        autoComplete.addListener("place_changed", () => {
            this.callBack(autoComplete);
        });
    };

    callBack = ac => {
        let address = ac.getPlace().formatted_address;
        this.setState({ address: address }, this.searchHomes);
    };

    onChange = e => {
        let propertyInfo = {};
        propertyInfo[e.target.id] = e.target.value;
        this.setState(propertyInfo);
    };

    submitProperty = status => {
        if (this.state.imgs.length < 1) {
            alert("Please add more pictures");
            return;
        }

        this.state.form.append("email", this.props.email);
        this.state.form.append("userid", this.props.id);
        this.state.form.append("price", this.state.price);
        this.state.form.append("address", this.state.address);
        this.state.form.append("propertyType", this.state.propertyType);
        this.state.form.append("description", this.state.description);
        this.state.form.append("bedRooms", this.state.bedRooms);
        this.state.form.append("bathRooms", this.state.bathRooms);
        this.state.form.append("yearBuilt", this.state.yearBuilt);
        this.state.form.append("sqFeetLot", this.state.sqFeetLot);
        this.state.form.append("sqFeet", this.state.sqFeet);
        this.state.form.append("status", status);

        API.posthome(this.state.form)
            .then(response => {
                this.props.history.push("/nav");
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        return (
            <div>
                <TopNav />
                <div className="saveDraft-publish-buttons">
                    <button onClick={this.submitProperty.bind(this, "draft")}>
                        Save As Draft
                    </button>
                    <button
                        id="pubButton"
                        onClick={this.submitProperty.bind(this, "publish")}
                    >
                        Publish Listing
                    </button>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <Dropzone
                                className="dropzone"
                                onDrop={this.handleDrop}
                                multiple
                                accept="image/*"
                            >
                                <div className="upload-actions text-center">
                                    <FloatingActionButton>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                    <br />
                                    <p>Upload Images</p>
                                </div>
                            </Dropzone>
                        </div>

                        <div className="col-4 text-center add-property-info">
                            <p className="mt-5 ">
                                <small>Price</small>
                            </p>
                            <div className="edit-price">
                                <img src={EditIcon} />
                                <input
                                    className="no-border text-center"
                                    placeholder="$300,000"
                                    value={this.state.price || null}
                                    onChange={this.onChange.bind(this)}
                                    type="text"
                                    id="price"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pic-preview ml-4">
                    <PicPreview
                        pics={this.state.imgs}
                        removePic={this.removePic}
                    />
                </div>

                <div className="add-address container-fluid ml-3">
                    <img src={EditIcon} />
                    <input
                        value={this.state.address}
                        className="no-border"
                        type="text"
                        placeholder="Add address"
                        id="address"
                        onChange={this.handleAddressChange.bind(this)}
                    />
                </div>

                <div className="container-fluid">
                    <div className="edit-property-details mt-2">
                        <div className="form-inline">
                            <select
                                id="bedRooms"
                                value={this.state.bedRooms}
                                onChange={this.onChange.bind(this)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span>Bed</span>
                        </div>
                        <div className="form-inline">
                            <select
                                value={this.state.bathRooms}
                                id="bathRooms"
                                onChange={this.onChange.bind(this)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span>Bath</span>
                        </div>

                        <div className="edit-sqfeet form-inline">
                            <img src={EditIcon} />
                            <input
                                value={this.state.sqFeet || null}
                                className="no-border"
                                placeholder="1000"
                                onChange={this.onChange.bind(this)}
                                type="text"
                                id="sqFeet"
                            />
                            <span>sq ft home size</span>
                        </div>

                        <div className="edit-sqfeet-lot form-inline">
                            <img src={EditIcon} />
                            <input
                                value={this.state.sqFeetLot || null}
                                className="no-border"
                                placeholder="1000"
                                onChange={this.onChange.bind(this)}
                                type="text"
                                id="sqFeetLot"
                            />
                            <span>sq ft lot size</span>
                        </div>

                        <div className="form-inline">
                            <select
                                id="propertyType"
                                value={this.state.propertyType}
                                onChange={this.onChange.bind(this)}
                            >
                                <option value="Single Family Home">
                                    Singe Family Home
                                </option>
                                <option value="Duplex">Duplex</option>
                                <option value="Multi-Unit">Multi-Unit</option>
                                <option value="Townhouse">Townhouse</option>
                            </select>
                        </div>
                        <div className="form-inline">
                            <select
                                value={this.state.yearBuilt}
                                id="yearBuilt"
                                onChange={this.onChange.bind(this)}
                            >
                                {this.years.map((year, index) => {
                                    return (
                                        <option key={index} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                            <span>year built</span>
                        </div>
                    </div>

                    <div className="ml-3 mb-5">
                        <TextField
                            value={this.state.description || null}
                            floatingLabelText="Description"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            type="text"
                            id="description"
                        />
                    </div>
                </div>
                <NavBar selectedIndex={1} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
        mapActions: bindActionCreators(mapActions, dispatch)
    };
}

const WrappedContainer = GoogleApiWrapper({
    apiKey: "AIzaSyBd8HrEYJVSBoNvYs-fWVynMBBHgQbD1mo"
})(AddProp);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedContainer);