import React from "react";

class ErrorBoundary extends React.Component {
    state = {
        error: null,
        errorInfo: null
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }


    render() {
        const {error, errorInfo} = this.state;

        if (errorInfo) {
            return (
                <div>
                    <h2>发生错误</h2>
                    <div>{errorInfo}</div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
