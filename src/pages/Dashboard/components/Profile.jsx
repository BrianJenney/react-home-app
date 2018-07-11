import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import ListHome from "./ListHome";
import FillOutProfile from "./FillOutProfile";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div>
                <ListHome />
                <FillOutProfile />
            </div>
        );
    }
}
export default Profile;
