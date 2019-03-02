import React from "react";
import PropertyForm from "../../pages/AddProperty/components/PropertyForm";
import API from "../../api/helpers";

class EditProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: null
        };
    }

    componentDidMount() {
        API.getHome(this.props.match.params.id).then(response => {
            this.setState({ home: response.data.doc });
        });
    }

    render() {
        return (
            <PropertyForm
                home={this.state.home}
                editMode
                history={this.props.history}
            />
        );
    }
}

export default EditProperty;
