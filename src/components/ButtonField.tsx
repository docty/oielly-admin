import { IButtonField } from "../interface";

const ButtonField = (props: IButtonField) => {
    if(props.clearButton){
        return(
            <div className="row mb-4">
                <div className="col text-right">
                    <button  className="btn btn-danger" style={{ marginRight: '10px' }}> <i className="uil uil-times mr-1"></i> Clear All </button>
                    <button  className="btn btn-success" type={props.type} onClick={props.onClick}><i className="uil uil-file-alt mr-1"></i> {props.label} </button>
                    {
                        props.isLoading && (
                        <div className="spinner-border text-secondary" style={{ margin: '0px 10px', display: 'inline-block' }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        )
                    }
                </div>
            </div> 
        )
    } else {
        return(
            <div className="form-group row">
                <label className="col-md-3 col-form-label"></label>
                <div className="col-md-9" >
                    <button className="btn btn-primary" onClick={props.onClick} type={props.type} style={{width: '50%'}}>{props.label}</button>
                    {
                    props.isLoading && (
                            <div className="spinner-border text-secondary" style={{ margin: '0px 10px', display: 'inline-block'}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                    ) 
                    }
                </div>
            </div>
        )
    }
}

export default ButtonField;