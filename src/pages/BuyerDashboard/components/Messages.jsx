import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import NavBar from "../../../components/BreadcrumbNav";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            unreadMessages: 0
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        let unreadMessages = 0;
        API.getMessages(this.props.userEmail).then(responses => {
            const data = responses.data;

            data.forEach(message => {
                unreadMessages += message.messages.filter(item => {
                    return item.to === this.props.userEmail && !item.viewed;
                }).length;

                this.setState({ unreadMessages });
            });
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
                    <span className="section-title">
                        Answer Seller Questions
                    </span>
                    <span
                        className={
                            this.state.collapse
                                ? "fa fa-2x fa-angle-up pl-4"
                                : "fa fa-2x fa-angle-down pl-4"
                        }
                        onClick={this.toggle}
                    />
                    <small className="ml-auto">
                        {this.state.unreadMessages} Messages
                    </small>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <Link to="/messages">
                        {this.state.unreadMessages} unread messages.
                    </Link>
                </Collapse>
            </div>
        );
    }
}
export default Messages;
