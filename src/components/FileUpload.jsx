import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dropzone from "react-dropzone";
import "../styles/fileUpload.css";

const FileUpload = ({
    fileType = "image/*",
    documentType = "fileName",
    title = "File Upload",
    handleUpload,
    ...others
}) => {
    return (
        <div>
            <Dropzone
                className="fileUpload-dropzone-wrapper"
                onDrop={handleUpload.bind(null, documentType)}
                accept={fileType}
            >
                <div className="fileUpload-actions">
                    <FloatingActionButton mini className="mt-3">
                        <ContentAdd />
                    </FloatingActionButton>

                    <span>
                        <p className="text-primary">{title}</p>
                    </span>
                </div>
            </Dropzone>
        </div>
    );
};

export default FileUpload;
