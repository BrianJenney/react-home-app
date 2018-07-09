import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import { Accordion } from "react-bootstrap";
import { Panel } from "react-bootstrap";

import API from "../../api/helpers.js";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>

                <Accordion>
                    <Panel header="Collapsible Group Item #1" eventKey="1">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                        wolf moon tempor, sunt aliqua put a bird on it squid
                        single-origin coffee nulla assumenda shoreditch et.
                        Nihil anim keffiyeh helvetica, craft beer labore wes
                        anderson cred nesciunt sapiente ea proident. Ad vegan
                        excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt
                        you probably haven't heard of them accusamus labore
                        sustainable VHS.
                    </Panel>
                    <Panel header="Collapsible Group Item #2" eventKey="2">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                        wolf moon tempor, sunt aliqua put a bird on it squid
                        single-origin coffee nulla assumenda shoreditch et.
                        Nihil anim keffiyeh helvetica, craft beer labore wes
                        anderson cred nesciunt sapiente ea proident. Ad vegan
                        excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt
                        you probably haven't heard of them accusamus labore
                        sustainable VHS.
                    </Panel>
                    <Panel header="Collapsible Group Item #3" eventKey="3">
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                        wolf moon tempor, sunt aliqua put a bird on it squid
                        single-origin coffee nulla assumenda shoreditch et.
                        Nihil anim keffiyeh helvetica, craft beer labore wes
                        anderson cred nesciunt sapiente ea proident. Ad vegan
                        excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt
                        you probably haven't heard of them accusamus labore
                        sustainable VHS.
                    </Panel>
                </Accordion>
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
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
