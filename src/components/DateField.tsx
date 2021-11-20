import { IDateField } from "../interface";

const DateField = (props: IDateField) => (
    <div className="form-group row">
        <label htmlFor="example-date-input" className="col-md-2 col-form-label">{props.label}</label>
        <div className="col-md-10">
            <input className="form-control" type="date" value={props.value} id="example-date-input" name="dateCreated"  onChange={props.onValueChange}/>
        </div>
    </div>
)

export default DateField;