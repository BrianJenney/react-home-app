import React from "react";
import PropertyForm from "../../pages/AddProperty/components/PropertyForm";
import API from "../../api/helpers";

class EditProperty extends React.Component {
    state = {
        home: null
    };

    componentDidMount() {
        API.getHome(this.props.match.params.id).then(response => {
            this.setState({ home: response.data.doc });
        });
    }

    render() {
        return (
            <PropertyForm home={this.state.home} history={this.props.history} />
        );
    }
}

export default EditProperty;
