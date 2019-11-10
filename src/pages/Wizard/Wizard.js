import React, { useState } from "react";
import Question from "../../components/Question/Question";
import { withRouter } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import NavBar from "../../components/BreadcrumbNav";
import "./styles/wizard.css";
import { compileFunction } from "vm";

const Quiz = () => {
    const [form, setForm] = useState(new FormData());
    const [page, setPage] = useState(0);
    const [completed, setCompleted] = useState(0);

    const optionChangeHandler = (val, modelName) => {
        form.append(modelName, val);
        setForm(form);

        if (page + 1 > Object.keys(config).length - 1) {
            //TODO: send form
        } else {
            setPage(page => page + 1);
        }
        setCompleted((100 / config.length) * (page + 1));
    };

    const config = [
        {
            text:
                "Would you like Micasa to represent you? Select no if you'd prefer to use an existing realtor",
            componentType: "binaryOption",
            showOptionsValue: false,
            hideOptionsValue: true,
            subComponentType: "fileUpload",
            options: [
                {
                    label: "Yes",
                    value: true
                },
                {
                    label: "No",
                    value: false
                }
            ],
            subOptions: [],
            subTitle: "Upload contract agreement",
            optionChangeHandler: optionChangeHandler,
            modelName: "authorizeToRepresent"
        },
        {
            text: "Are you the owner of the home?",
            componentType: "binaryOption",
            showOptionsValue: "non-owner",
            hideOptionsValue: "owner",
            subComponentType: "multiOptions",
            options: [
                {
                    label: "Yes",
                    value: "owner"
                },
                {
                    label: "No",
                    value: "non-owner"
                }
            ],
            subOptions: [
                {
                    label: "Power of Attorney",
                    value: "poa"
                },
                {
                    label: "trustee",
                    value: "trustee"
                },
                {
                    label: "Adminstrator/Conservator",
                    value: "admin"
                },
                {
                    label: "Neither",
                    value: "n/a"
                }
            ],
            subTitle: "I'm the...",
            optionChangeHandler: optionChangeHandler,
            modelName: "ownerType"
        },
        {
            text: "What is the full name of ownership?",
            componentType: "freeText",
            options: [],
            subTitle: "",
            optionChangeHandler: optionChangeHandler,
            modelName: "ownershipName"
        },
        {
            text: "Have you ever sold a home?",
            componentType: "binaryOption",
            showOptionsValue: "hasSoldBefore",
            hideOptionsValue: "n/a",
            subComponentType: "multiOptions",
            options: [
                {
                    label: "Yes",
                    value: "hasSoldBefore"
                },
                {
                    label: "No",
                    value: "n/a"
                }
            ],
            subOptions: [
                {
                    label: "Realtor",
                    value: "realtor"
                },
                {
                    label: "Attorney",
                    value: "attorney"
                },
                {
                    label: "Sold it myself",
                    value: "independent"
                },
                {
                    label: "Other",
                    value: "other"
                }
            ],
            subTitle: "Via which method?",
            optionChangeHandler: optionChangeHandler,
            modelName: "previousSellingMethod"
        },
        {
            text:
                "Do you, a relative, or one of the owners of the property hold an active California Real Estate License?",
            componentType: "binaryOption",
            showOptionsValue: false,
            hideOptionsValue: true,
            options: [
                {
                    label: "Yes",
                    value: true
                },
                {
                    label: "No",
                    value: false
                }
            ],
            subOptions: [],
            optionChangeHandler: optionChangeHandler,
            modelName: "isRelativeAgent"
        },
        {
            text: "Ideally how soon do you want the property sold?",
            componentType: "binaryOption",
            options: [
                {
                    label: "ASAP",
                    value: "asap"
                },
                {
                    label: "3 Months",
                    value: "3mos"
                },
                {
                    label: "6 Months",
                    value: "6mos"
                }
            ],
            subOptions: [],
            optionChangeHandler: optionChangeHandler,
            modelName: "idealTimeframe"
        }
    ];

    const changePage = page => {
        const pageLimit = Math.floor(((completed || 1) / 100) * config.length);
        if (page < 0 || page >= config.length || page > pageLimit) {
            return;
        }
        setPage(page);
    };

    return (
        <div>
            <div className="wizard-body">
                <Question {...config[page]} />
                <div className="progress-bar-container">
                    <i
                        onClick={() => changePage(page - 1)}
                        className="material-icons"
                    >
                        arrow_back
                    </i>
                    <div className="progress-line">
                        <LinearProgress
                            variant="determinate"
                            value={completed}
                        />
                    </div>
                    <i
                        onClick={() => changePage(page + 1)}
                        className="material-icons"
                    >
                        arrow_forward
                    </i>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default withRouter(Quiz);
