import React from 'react';
import { Collapse } from 'reactstrap';
import API from '../../../api/helpers';
import FileUpload from '../../../components/FileUpload';
import { debounce } from 'throttle-debounce';

class PurchaseAgreement extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            form: new FormData(),
            currentOffer: null,
            purchaseAgreement: '',
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.currentOffer) {
            this.setState({
                currentOffer: nextProps.currentOffer.offer || null,
                purchaseAgreement:
                    nextProps.currentOffer.purchaseAgreement || '',
            });
        }
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = (documentType, files) => {
        files.forEach((file) => {
            this.state.form.set('file', file);

            this.state.form.set('homeId', this.props.home._id);
            this.state.form.set('userId', this.props.user.user._id);
            this.state.form.set('documentType', documentType);
            API.makeOffer(this.state.form).then((res) => {
                this.setState({
                    purchaseAgreement: res.data.purchaseAgreement || '',
                });
            });
        });
    };

    updatePurchasePrice = (e) => {
        this.setState({ currentOffer: e.target.value });

        let obj = {
            homeId: this.props.home._id,
            userId: this.props.user._id,
            offer: e.target.value,
        };

        debounce(1000, API.makeOffer(obj));
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className="pr-4">2</h1>
                    <span className="section-title">
                        Fill Out Purchase Agreement
                    </span>
                    <span
                        className={
                            this.state.collapse
                                ? 'fa fa-2x fa-angle-up pl-4'
                                : 'fa fa-2x fa-angle-down pl-4'
                        }
                        onClick={this.toggle}
                    />
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <h5 className="blue">Things Left To Do...</h5>

                    {/*
                    Removing this section for now... 2/1/19
                    */}
                    {/* <div>
                        <input
                            type="checkbox"
                            disabled
                            checked={this.state.currentOffer}
                            className="d-inline m-2 ml-0"
                        />
                        <p className="paragraph d-inline">
                            Enter your offer amount
                        </p>
                        <br />
                        {this.props.home && (
                            <div className="ml-5">
                                <div className="d-inline-block">
                                    <small className="text-center text-primary">
                                        Your Offer
                                    </small>
                                    <br />
                                    <i className="lightGrey fa fa-pencil d-inline" />
                                    <input
                                        type="number"
                                        className="dyanmic-input-size d-inline borderless"
                                        placeholder={this.props.home.price}
                                        value={this.state.currentOffer}
                                        onChange={this.updatePurchasePrice.bind(
                                            this
                                        )}
                                    />
                                </div>

                                <div
                                    className="d-inline-block"
                                    style={{
                                        borderLeft: "1px solid grey",
                                        height: 30
                                    }}
                                />
                                <div className="d-inline-block ml-5">
                                    <small className="text-center text-primary">
                                        Asking Price
                                    </small>
                                    <br />
                                    <div className="muted paragraph d-inline">
                                        <h5>${this.props.home.price}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}

                    <input
                        type="checkbox"
                        disabled
                        checked={this.state.purchaseAgreement.length}
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        and fill out Purchase Agreement
                    </p>

                    <FileUpload
                        title={'Upload Purchase Agreement'}
                        handleUpload={this.handleDrop}
                        documentType={'purchaseAgreement'}
                    />

                    {this.state.purchaseAgreement.length > 0 && (
                        <div className="d-inline">
                            <i
                                className="fa fa-file-pdf-o d-inline mr-2"
                                aria-hidden="true"
                            />
                            <a href={this.state.purchaseAgreement}>
                                {this.state.purchaseAgreement}
                            </a>
                        </div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default PurchaseAgreement;
