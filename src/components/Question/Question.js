import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import noop from 'lodash/noop';
import './styles/question.css';

const Question = ({
    text,
    componentType,
    subComponentType,
    options = [],
    subOptions = [],
    subTitle,
    showOptionsValue,
    hideOptionsValue,
    optionChangeHandler = noop,
    modelName,
}) => {
    const [showOption, setShowOption] = useState(hideOptionsValue);
    const inputRef = useRef(null);

    const handleClick = (val) => {
        if (showOptionsValue !== undefined) {
            showOptionsValue === val
                ? setShowOption(val)
                : optionChangeHandler(val, modelName);
        } else {
            optionChangeHandler(val, modelName);
        }
    };

    const fileUpload = () => (
        <div className="options-container">
            <span>{subTitle}</span>
            <Dropzone
                className="multi-options"
                onDrop={(files) => optionChangeHandler(files, modelName)}
                accept="*"
            >
                <span>Browse File</span>
            </Dropzone>
        </div>
    );

    const binaryOption = () => (
        <div className="options-container">
            {options.map((option) => {
                return (
                    <div
                        className="oval-options"
                        key={option.value}
                        onClick={() => {
                            handleClick(option.value);
                        }}
                    >
                        <p>{option.label}</p>
                    </div>
                );
            })}
        </div>
    );

    const multiOptions = () => (
        <div className="options-container">
            <span>{subTitle}</span>
            {subOptions.map((option) => {
                return (
                    <button
                        className="multi-options"
                        key={option.value}
                        onClick={() => {
                            handleClick(option.value);
                        }}
                    >
                        <p>{option.label}</p>
                    </button>
                );
            })}
        </div>
    );

    const freeText = () => (
        <div className="text-container">
            <input className="free-text" ref={inputRef} />
            <div
                className="text-submit"
                onClick={() => handleClick(inputRef.current.value)}
            >
                <i className="material-icons">keyboard_arrow_right</i>
            </div>
        </div>
    );

    const optionsWithDivider = () => (
        <div className="options-container-divider">
            {options.map((option) => {
                return (
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: option.html }}
                        ></div>
                        <button
                            className="multi-options"
                            key={option.value}
                            onClick={() => {
                                handleClick(option.value);
                            }}
                        >
                            <p>{option.label}</p>
                        </button>
                        <div className="verticalDivider"></div>
                    </div>
                );
            })}
        </div>
    );

    const componentTypeMap = {
        fileUpload,
        binaryOption,
        multiOptions,
        freeText,
        optionsWithDivider,
    };

    const hasSubOptions = !!subComponentType;
    const OptionComponent = componentTypeMap[componentType];
    const SubOptionComponent = componentTypeMap[subComponentType];

    return (
        <div className="question-body">
            <p className="question-header">{text}</p>
            <OptionComponent />
            {hasSubOptions &&
                showOptionsValue !== undefined &&
                showOption === showOptionsValue && <SubOptionComponent />}
        </div>
    );
};

export default Question;
