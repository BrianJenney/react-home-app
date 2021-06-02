import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import DocDownload from '../img/doc_download.png';
import '../styles/fileUpload.css';

const FileUpload = ({
    fileType = 'image',
    documentType = 'fileName',
    title = 'File Upload',
    hasUploaded,
    downloadUrl,
    handleUpload,
    downloadOnly,
}) => {
    const [showUpload, setShowUpload] = useState(hasUploaded);

    const toggleActions = (bool) => {
        setShowUpload(bool);
    };

    const activeStyle = {
        width: '70%',
        transition: 'ease .5s',
    };

    if (downloadOnly) {
        Object.assign(activeStyle, {
            borderBottomRightRadius: '1em',
            width: '100%',
        });
    }

    const nonActiveStyle = {
        width: '30%',
        transition: 'ease .5s',
    };

    return (
        <div className="uplopad-download">
            <div className="title">
                <a target="_blank" href={downloadUrl}>
                    {title}
                </a>
            </div>

            <div className="actions-container">
                <div
                    onMouseOver={() => toggleActions(false)}
                    onMouseLeave={() =>
                        toggleActions(hasUploaded ? true : false)
                    }
                    style={showUpload ? nonActiveStyle : activeStyle}
                    className="download-section"
                >
                    <div className="download-actions">
                        <img
                            width="20"
                            height="20"
                            src={DocDownload}
                            alt="download doc"
                        />

                        {!showUpload && <p>Download</p>}
                    </div>
                </div>
                {!downloadOnly && (
                    <div
                        onMouseOver={() => toggleActions(true)}
                        onMouseLeave={() =>
                            toggleActions(hasUploaded ? false : true)
                        }
                        style={showUpload ? activeStyle : nonActiveStyle}
                        className="upload-section"
                    >
                        <Dropzone
                            className="fileUpload-dropzone-wrapper"
                            onDrop={handleUpload.bind(null, documentType)}
                            accept={fileType}
                        >
                            <div className="fileUpload-actions">
                                {showUpload && <p>Upload</p>}
                                <img
                                    style={{ transform: 'rotate(180deg)' }}
                                    width="20"
                                    height="20"
                                    src={DocDownload}
                                    alt="download doc"
                                />
                            </div>
                        </Dropzone>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
