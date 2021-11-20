import { CSSProperties, useCallback, useEffect, useState } from "react";
import { DropzoneState, useDropzone } from 'react-dropzone';



const ImageUpload = (props: IImageUpload) => {
    const [files, setFiles] = useState<any[]>([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);
    
    const uploadClick = () => {
        props.onSubmit!(files)
    }

    const { getRootProps, getInputProps, isDragActive  } = useDropzone(
            { 
                accept: 'image/jpeg, image/png', 
                maxFiles:2,

                onDrop 
            }
        ) as DropzoneState;

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt={'Nothing'}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {
                    !isDragActive ? 
                    <>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </> : 
                        <p>Drop files</p>
                }
                
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            <button onClick={uploadClick} className={'btn btn-primary'}>Upload </button>
        </section>
    )
}


const thumbsContainer = {
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
} as CSSProperties;

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
} as CSSProperties;

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

interface IImageUpload {
    onSubmit?: (file: any[]) => any;
}
export default ImageUpload;