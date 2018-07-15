import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "../../../styles/FillOutProfile.css";
import API from '../../../api/helpers.js'

class FillOutProfile extends React.Component {
    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: false,
          phoneNumber: null,
          file: null,
          form: new FormData()
         };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = files => {
        files.forEach(file => {
            this.setState({file});
        });
    };

postPhoneNumber() {
  //post request to backend/api using value of form
}

handleChange = (e) => {
  this.setState({phoneNumber: e.target.value})
}

updateProfile = () => {
  console.log(this.state);
  this.state.form.append("file", this.state.file)
  this.state.form.append("phoneNumber", this.state.phoneNumber)
  API.updateProfile(this.state.form).then((data)=>{
    console.log(data);
  })
}



    render() {
        return (
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">2</h1>
                    <span className="section-title">Fill Out Your Profile</span>
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
                    <Card>
                        <CardBody>
                          <div className="ml-4">
                          <h5 className="blue">Things Left To Do...</h5>
                          <input type="checkbox" className="d-inline m-2 ml-0"/>
                          <p className="paragraph d-inline"> Upload your profile photo <span className="purple">(this will only be shown to buyers if you reply to a message they send you)</span></p><br/>
                          <Dropzone
                              className="dropzone m-2 ml-5"
                              onDrop={this.handleDrop}
                              multiple
                              accept="image/*"
                          >
                              <div className="upload-actions text-center">
                                  <FloatingActionButton>
                                      <ContentAdd />
                                  </FloatingActionButton>
                                  <br />
                                  <p>Upload Profile Pic</p>
                              </div>
                          </Dropzone>

                          <input type="checkbox" className="d-inline m-2 ml-0"/>
                          <input onChange={this.handleChange.bind(this)} type="phone"/>
                          <p className="paragraph d-inline "> Add your phone number <span className="purple">(this will only be shown to buyers after you approve their offer)</span></p><br/>
                          <i className="lightGrey fas fa-pencil-alt d-inline ml-5"></i>
                          <a className="d-inline blue ml-1"><p className="d-inline blue ml-1">Add Phone Number</p></a>
                          <button onClick={this.updateProfile}>update</button>
                        </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
export default FillOutProfile;
