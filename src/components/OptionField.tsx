import { IOptionField } from "../interface";

const OptionField = (props: IOptionField) => {
    if (props.nextLine) {
        return(
            <div className="form-group">
                <label className="control-label">{props.label}</label>
                <select className="form-control select2" value={props.value} name={props.name} onChange={props.onValueChange}>
                    <option>{'Select'}</option>
                    {
                        props.item.map((res, index: number) => (
                            <option key={index} value={res.toLowerCase()}>{res}</option>
                        ))
                    }
                </select>
            </div>
        )
    } else {
        return (
            <div className="form-group row">
                <label className="col-md-2 col-form-label">{props.label}</label>
                <div className="col-md-10">
                    <select className="form-control" value={props.value} name={props.name} onChange={props.onValueChange}>
                        {
                            props.item.map((res, index: number) => (
                                <option key={index} value={res.toLowerCase()}>{res}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        )
    }

}

export default OptionField;