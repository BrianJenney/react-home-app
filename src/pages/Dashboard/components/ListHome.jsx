import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

class ListHome extends React.Component {
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
          <div style={{ display: "flex", alignItems: "center" }}>
              <h1 className="pr-4">1</h1>
              <span className="section-title">List Home</span>
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
                      Anim pariatur cliche reprehenderit, enim eiusmod
                      high life accusamus terry richardson ad squid. Nihil
                      anim keffiyeh helvetica, craft beer labore wes
                      anderson cred nesciunt sapiente ea proident.
                  </CardBody>
              </Card>
          </Collapse>
          </div>
        );
    }
}
export default ListHome;
