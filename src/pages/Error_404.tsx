import { Link } from "react-router-dom";
import errorImage from '../assets/images/404-error.png';
const Error_404 = () => {
    
    return(
        <div className="my-5 pt-sm-5">
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center">
                            <div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-4">
                                        <div className="error-img">
                                            <img src={errorImage} alt="" className="img-fluid mx-auto d-block"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-uppercase mt-4">Sorry, page not found</h4>
                            {/* <p className="text-muted">It will be as simple as Occidental in fact, it will be Occidental</p> */}
                            <div className="mt-5">
                                <Link className="btn btn-primary waves-effect waves-light" to={'/'}>Go to Login</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error_404;