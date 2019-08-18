import React, { Component } from "react";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { GoogleApiWrapper } from "google-maps-react";
import GoogleApiHOC from "../../../components/GoogleApiHOC";
import TopNav from "../../../components/TopNav";
import API from "../../../api/helpers.js";
import HousePics from "./HousePics";
import "../../../styles/search.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../Listings.ducks";
import Logo from "../../../img/logo-micasa.png";

const CardStyle = {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    backgroundColor: "#edeeef"
};

const LStyle = {
    color: "#495057"
};

const MStyle = {
    marginTop: 0
};

const IStyle = {
    paddingLeft: "1.3rem",
    top: 0
};

class UserSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoComplete: null,
            results: [],
            bedRooms: 0,
            bathRooms: 0,
            propertyType: null,
            maxPrice: Infinity,
            minPrice: 0,
            address: null
        };
    }

    handleAddressChange = e => {
        let input = e.target.value;
        this.callAddressAutoComplete(input);
    };

    callAddressAutoComplete = input => {
        const google = this.props.google;
        let autoComplete = new google.maps.places.Autocomplete(
            document.getElementById("search-address"),
            { types: ["geocode"] }
        );

        autoComplete.addListener("place_changed", () => {
            this.cb(autoComplete);
        });
    };

    cb = ac => {
        let address = ac.getPlace().formatted_address;
        this.setState({ address: address }, this.searchHomes);
    };

    handleChange = (type, event, index, val) => {
        let query = {};
        query[type] = val;
        this.setState(query, this.searchHomes);
    };

    searchHomes = () => {
        let searchObj = {};
        searchObj.propertyType = this.state.propertyType;
        searchObj.bathRooms = this.state.bathRooms;
        searchObj.bedRooms = this.state.bedRooms;
        searchObj.maxPrice = this.state.maxPrice;
        searchObj.minPrice = this.state.minPrice;
        searchObj.address = this.state.address;

        const {
            listings: { addMapMarker }
        } = this.props;
        addMapMarker(searchObj);
    };

    render() {
        return (
            <Card className="col-md-5 user-search" style={CardStyle}>
                <div className="header row" style={CardStyle}>
                    <TopNav />
                </div>
                <div className="search-input">
                    <span className="fa fa-search" />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for your home"
                        id="search-address"
                        onChange={this.handleAddressChange.bind(this)}
                    />
                </div>
                <div className="search-options row">
                    <div className="col-md-3">
                        <SelectField
                            floatingLabelText="Type"
                            className="user-select"
                            value={this.state.propertyType}
                            onChange={this.handleChange.bind(
                                null,
                                "propertyType"
                            )}
                            autoWidth={true}
                            floatingLabelStyle={{
                                transform: "scale(0.75) translate(0px, -28px)",
                                color: "#495057"
                            }}
                            menuStyle={MStyle}
                            iconStyle={IStyle}
                        >
                            <MenuItem
                                value={""}
                                className="menu-type"
                                primaryText="All"
                            />
                            <MenuItem
                                value={"Single Family Home"}
                                className="menu-type"
                                primaryText="Single Family Home"
                            />
                            <MenuItem
                                value={"townhouse"}
                                className="menu-type"
                                primaryText="Town House"
                            />
                            <MenuItem
                                value={"condo"}
                                className="menu-type"
                                primaryText="Condo"
                            />
                        </SelectField>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            floatingLabelText="Price"
                            className="user-select"
                            value={this.state.maxPrice}
                            onChange={this.handleChange.bind(null, "maxPrice")}
                            autoWidth={true}
                            floatingLabelStyle={LStyle}
                            menuStyle={MStyle}
                            iconStyle={IStyle}
                        >
                            <MenuItem value={"all"} primaryText="All" />
                            <MenuItem value={500000} primaryText="<500K" />
                            <MenuItem value={1000000} primaryText="<1M" />
                        </SelectField>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            floatingLabelText="Beds"
                            className="user-select"
                            value={this.state.bedRooms}
                            onChange={this.handleChange.bind(null, "bedRooms")}
                            floatingLabelStyle={LStyle}
                            menuStyle={MStyle}
                            iconStyle={IStyle}
                        >
                            <MenuItem value={1} primaryText="+1" />
                            <MenuItem value={2} primaryText="+2" />
                            <MenuItem value={3} primaryText="+3" />
                            <MenuItem value={4} primaryText="+4" />
                            <MenuItem value={5} primaryText="+5" />
                        </SelectField>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            floatingLabelText="Baths"
                            className="user-select"
                            value={this.state.bathRooms}
                            onChange={this.handleChange.bind(null, "bathRooms")}
                            floatingLabelStyle={LStyle}
                            menuStyle={MStyle}
                            iconStyle={IStyle}
                        >
                            <MenuItem value={1} primaryText="+1" />
                            <MenuItem value={2} primaryText="+2" />
                            <MenuItem value={3} primaryText="+3" />
                            <MenuItem value={4} primaryText="+4" />
                            <MenuItem value={5} primaryText="+5" />
                        </SelectField>
                    </div>
                </div>

                <HousePics pics={this.props.properties} />
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        properties: state.listings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        listings: bindActionCreators(actions, dispatch)
    };
}

const WrappedContainer = GoogleApiHOC(UserSearch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSearch);
