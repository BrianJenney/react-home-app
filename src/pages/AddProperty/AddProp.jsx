import React from "react";

import API from "../../api/helpers.js";
import NavBar from "../../components/BreadcrumbNav";
import TopNav from "../../components/TopNav";
import { GoogleApiWrapper } from "google-maps-react";

import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import Dropzone from "react-dropzone";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as mapActions from "../../actions/mapMarker";
import EditIcon from "../../img/icon-edit-small.png";
import PicPreview from "./components/PicPreview";
import "../../styles/addProperty.css";

class AddProp extends React.Component {
    constructor() {
        super();
        this.removePic = this.removePic.bind(this);
    }
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
        sqFeetLotSize: 0,
        yearBuilt: Date.now(),
        form: new FormData()
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

    submitProperty = () => {
        let self = this;

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
        this.state.form.append("sqFeetLot", this.state.sqFeetLotSize);
        this.state.form.append("sqFeet", this.state.sqFeet);

        API.posthome(this.state.form)
            .then(response => {
                self.props.history.push("/nav");
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        return (
            <div>
                <TopNav />
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
                                className="no-border"
                                placeholder="1000"
                                onChange={this.onChange.bind(this)}
                                type="text"
                                id="sqFtLot"
                            />
                            <span>sq ft lot size</span>
                        </div>

                        <div className="form-inline">
                            <select
                                id="propertyType"
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
                    </div>

                    <div className="ml-3">
                        <TextField
                            floatingLabelText="Description"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            type="text"
                            id="description"
                        />

                        <RaisedButton
                            className="mb-5"
                            primary={true}
                            label="Add Property"
                            onClick={this.submitProperty}
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
