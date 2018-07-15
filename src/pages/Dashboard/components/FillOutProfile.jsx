import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "../../../styles/FillOutProfile.css";

class FillOutProfile extends React.Component {
    constructor(props) {

        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: false,
         };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
        this.postPhoneNumber = this.postPhoneNumber.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

postPhoneNumber() {
  //post request to backend/api using value of form
}

userPhoneNumber() {
    //when user clicks on add your phone number checkbox, return form for user to add phone number
          return (
            <div>
            <td>
              <form>
                <input type="text" placeholder="Phone Number" ref="phoneNumber" className="postPhoneNumber"/>
              </form>
            </td>
            </div>
          )
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
                          <p className="paragraph d-inline "> Add your phone number <span className="purple">(this will only be shown to buyers after you approve their offer)</span></p><br/>
                          <i className="lightGrey fas fa-pencil-alt d-inline ml-5"></i>
                          <a className="d-inline blue ml-1"><p className="d-inline blue ml-1">Add Phone Number</p></a>
                        </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
export default FillOutProfile;
