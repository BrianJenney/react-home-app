import React from "react";
import PropertyForm from "../../pages/AddProperty/components/PropertyForm";
import API from "../../api/helpers";

class EditProperty extends React.Component {
    state = {
        home: null
    };

    componentDidMount() {
        API.getHome(this.props.match.params.id).then(response => {
            this.setState({ home: response.data.doc[0] });
        });
    }

    render() {
        return <PropertyForm home={this.state.home} />;
    }
}

export default EditProperty;
