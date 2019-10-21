import React, { useState } from "react";
import Question from "../../components/Question/Question";
import { withRouter } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import NavBar from "../../components/BreadcrumbNav";
import "./styles/wizard.css";

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
        setCompleted((100 / Object.keys(config).length) * (page + 1));
    };

    const config = [
        {
            text: "Would you like Micasa to represent you?0",
            componentType: "binaryOption",
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
            subTitle: "",
            optionChangeHandler: optionChangeHandler,
            modelName: "test"
        },
        {
            text: "Would you like Micasa to represent you?1",
            componentType: "binaryOption",
            showOptionsValue: true,
            hideOptionsValue: false,
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
            subOptions: [
                {
                    label: "Yes",
                    value: true
                },
                {
                    label: "No",
                    value: false
                }
            ],
            subTitle: "Other stuff...",
            optionChangeHandler: optionChangeHandler,
            modelName: "test1"
        },
        {
            text: "Would you like Micasa to represent you?2",
            componentType: "freeText",
            options: [],
            subOptions: [],
            subTitle: "",
            optionChangeHandler: optionChangeHandler,
            modelName: "test3"
        }
    ];

    return (
        <div>
            <div className="wizard-body">
                <Question {...config[page]} />
                <div class="progress-bar-container">
                    <i class="material-icons">arrow_back</i>
                    <div class="progress-line">
                        <LinearProgress
                            variant="determinate"
                            value={completed}
                        />
                    </div>
                    <i class="material-icons">arrow_forward</i>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default withRouter(Quiz);
