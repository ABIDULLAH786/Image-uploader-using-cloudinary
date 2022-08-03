import React, { useState } from 'react';
import Alert from './Alert';

export default function Upload() {
    const [inputFileName, setInputFileName] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [fileSubmit, setFileSubmit] = useState(false);

    const [imageURL, setImageURL] = useState(undefined);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setInputFileName(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const response = await fetch('https://nodejs-image-uploader-ak786.herokuapp.com/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setImageURL(data.url);
            console.log(data.url);
            setFileSubmit(true);

            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div className='row'>
            <div className='col-6'>
                <h3 >Upload an Image to get url</h3>
                <Alert msg={errMsg} type="danger" />
                <Alert msg={successMsg} type="success" />
                <form onSubmit={handleSubmitFile} className="form mt-4">
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={inputFileName}
                        className="form-input"
                        required
                    />
                    <button className="btn" type="submit">
                        Submit
                    </button>
                    {selectedFile && (<button className="btn mx-3" onClick={() => {
                        setInputFileName('');
                        setPreviewSource('');
                        setSelectedFile(false);
                        setFileSubmit(false);
                        setImageURL(undefined);
                    }}>
                        Reset
                    </button>)}
                </form>
                {previewSource && (
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '250px' }}
                    />
                )}

            </div>
            <div className='col-5' >
                {imageURL && (<>
                    <div className='my-3' >
                        <h5>Image URL</h5>
                        <a href={imageURL} target={'_blank'}>{imageURL}</a>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}
