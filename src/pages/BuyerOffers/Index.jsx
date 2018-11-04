import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import * as actions from "./BuyerOffers.ducks";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";
import moment from "moment";

class Dashboard extends React.Component {
    componentDidMount = () => {
        this.props.offerActions.getOffers(this.props.user.id);
    };

    goToOffer = id => {
        this.props.history.push(`/buyerdashboard/${id}`);
    };

    renderOffers = () => {
        return this.props.offers.map((offer, idx) => {
            return (
                <div key={idx}>
                    <p
                        className="fake-link"
                        onClick={this.goToOffer.bind(null, offer._id)}
                    >
                        Offer
                    </p>
                    <p>{moment(offer.createdAt).format("l")}</p>
                </div>
            );
        });
    };

    render() {
        return (
            <div>
                <TopNav />
                <h1>Offers</h1>
                <div>{this.renderOffers()}</div>
                <NavBar />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name,
        user: state.loggedIn.user,
        offers: state.buyerOffers.offers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
        offerActions: bindActionCreators(actions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
