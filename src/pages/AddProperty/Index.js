import React from "react";
import PropertyForm from "./components/PropertyForm";

class AddProperty extends React.Component {
    render() {
        return (
            <PropertyForm
                home={null}
                user={this.props.user}
                history={this.props.history}
            />
        );
    }
}

export default AddProperty;
