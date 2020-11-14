import React from "react"

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            insideText: this.props.text[0],
            toggle: true
        }
        console.log(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (this.state.toggle) {
            console.log('in if')
            this.setState({
                insideText: this.props.text[1],
                toggle: false
            })
        } else {
            console.log('in else')
            this.setState({
                insideText: this.props.text[0],
                toggle: true
            })
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.insideText}</h1>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>click</button>
            </div>
        )
    }
}

export default Slider