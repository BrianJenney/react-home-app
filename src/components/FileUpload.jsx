import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dropzone from "react-dropzone";

const FileUpload = ({
    fileType = "image/*",
    fileName = "fileName",
    title,
    handleUpload,
    ...others
}) => {
    return (
        <div>
            <Dropzone
                className="dropzone w-25 h-25 m-2"
                onDrop={handleUpload.bind(null, fileName)}
                accept={fileType}
            >
                <div className="upload-actions text-center">
                    <FloatingActionButton mini className="mt-3">
                        <ContentAdd />
                    </FloatingActionButton>
                    <br />
                    <small className="text-primary">{title}</small>
                </div>
            </Dropzone>
        </div>
    );
};

export default FileUpload;
