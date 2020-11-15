import React, { useState } from 'react';
import Question from '../../components/Question/Question';
import withBackground from '../../components/WithBackground';
import WiseOwl from '../../img/wise_owl.png';
import { Progress } from 'antd';
import './styles/wizardStyle.css';

const Quiz = ({
    optionChangeHandlerCallback,
    total,
    completeWizard,
    config,
}) => {
    const [page, setPage] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [pageHistory, setPageHistory] = useState([0]);

    const optionChangeHandler = (val, modelName, nextPage = null) => {
        optionChangeHandlerCallback(val, modelName);

        if (config[page].isLastQuestion) {
            completeWizard();
        } else {
            let newPage = nextPage || page + 1;
            if (config[page].getNextPage) {
                newPage = config[page].getNextPage(val);
            }
            setPage(newPage);
            setPageHistory((hist) => [...hist, newPage]);
        }
        setCompleted((100 / total) * (page + 1));
    };

    const changePageForward = () => {
        const idx = pageHistory.findIndex(page) || 0;
        const newIdx = idx + 1;
        if (pageHistory[newIdx]) {
            setPage(pageHistory[newIdx]);
        }
    };

    const changePageBackward = () => {
        const idx = pageHistory.findIndex(page);
        const newIdx = idx - 1;
        if (pageHistory[newIdx]) {
            setPage(pageHistory[newIdx]);
        }
    };

    return (
        <div className="wizard-body">
            <div className="wise-owl">
                <img src={WiseOwl} />
            </div>
            <Question
                {...config[page]}
                optionChangeHandler={optionChangeHandler}
            />
            <div className="progress-bar-container">
                {page > 0 ? (
                    <i
                        onClick={() => changePageBackward()}
                        className="material-icons"
                        style={{ color: 'white' }}
                    >
                        arrow_back
                    </i>
                ) : null}
                <div className="progress-line">
                    <Progress
                        type="line"
                        percent={completed}
                        strokeColor="#fff"
                        trailColor="#979797"
                        showInfo={false}
                    />
                </div>
                <i
                    onClick={() => changePageForward()}
                    className="material-icons"
                >
                    arrow_forward
                </i>
            </div>
        </div>
    );
};

export default withBackground(Quiz);
