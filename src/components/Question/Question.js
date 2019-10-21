import React, { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import noop from "lodash/noop";
import "./styles/question.css";

const Question = ({
    text,
    componentType,
    fileName,
    options = [],
    subOptions = [],
    subTitle,
    showOptionsValue,
    hideOptionsValue,
    optionChangeHandler = noop,
    modelName
}) => {
    const [showOption, setShowOption] = useState(hideOptionsValue);
    const inputRef = useRef(null);

    const fileUpload = () => (
        <div>
            <span>Browse...</span>
            <Dropzone
                className="file-upload"
                onDrop={optionChangeHandler.bind(null, modelName)}
                accept="*"
            >
                <span>Upload</span>
            </Dropzone>
        </div>
    );

    const handleClick = val => {
        if (showOptionsValue !== undefined) {
            showOptionsValue === val
                ? setShowOption(val)
                : optionChangeHandler(val, modelName);
        } else {
            optionChangeHandler(val, modelName);
        }
    };

    const binaryOption = () => (
        <div class="options-container">
            {options.map(option => {
                return (
                    <div
                        className="oval-options"
                        key={option.value}
                        onClick={() => {
                            handleClick(option.value);
                        }}
                    >
                        {option.label}
                    </div>
                );
            })}
        </div>
    );

    const multiOptions = () => (
        <div class="options-container">
            <span>{subTitle}</span>
            {subOptions.map(option => {
                return (
                    <button
                        className="multi-options"
                        key={option.value}
                        onClick={() => {
                            optionChangeHandler(option.value, modelName);
                        }}
                    >
                        {option.label}
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
                onClick={() =>
                    optionChangeHandler(inputRef.current.value, modelName)
                }
            >
                <i class="material-icons">keyboard_arrow_right</i>
            </div>
        </div>
    );

    const componentTypeMap = {
        fileUpload,
        binaryOption,
        multiOptions,
        freeText
    };
    const hasSubOptions = subOptions.length > 0;

    const OptionComponent = componentTypeMap[componentType];
    const SubOptionComponent = multiOptions;

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
