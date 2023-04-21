import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state ={
        error: false
    }
    componentDidCatch(err, info) {
        this.setState({error: true})
    }
    render () {
        if (this.state.error) {
            return (
                <div>
                    <ErrorMessage/>
                    <h2 style={{textAlign: 'center'}}>ОБЕРЕЖНО!!! Тут фахівці зломали хуя!..</h2>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;