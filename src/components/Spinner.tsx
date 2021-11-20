const Spinner = () => {
    const css = {
        margin: '0px 10px'
    }
    return(
        <div className="spinner-border text-secondary" style={css}  role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner;