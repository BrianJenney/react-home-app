import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            offers: []
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        console.log(this.props.user);
        API.getOffers(this.props.user).then(res => {
            this.setState({ offers: res.data });
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">4</h1>
                    <span className="section-title">Review Offers</span>
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
                    <h5 className="blue">Things Left To Do...</h5>
                    <input type="checkbox" className="d-inline m-2 ml-0" />
                    <p className="paragraph d-inline">
                        <a
                            className="mr-1"
                            href="https://res.cloudinary.com/dzriw5xmd/raw/upload/v1532886088/CA_Disclosure_Package_g72als.zip"
                        >
                            Download
                        </a>
                        and fill out California disclosure package
                    </p>
                </Collapse>
            </div>
        );
    }
}
export default Offers;
