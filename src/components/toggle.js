import React from "react"


class Slider extends React.Component {
    constructor() {
        super();
        this.state = {
            initMinValue: 0,
            initMaxValue: 100
        }
    }

    render() {
        return (
            <div className="container p-3 my-3 border">
                <form>
                    <div className="form-group">
                        <label>محدوده هرچی</label>
                        <input type="range"
                               className="form-control-range"
                               min={this.state.initMinValue}
                               max={this.state.initMaxValue}
                               id="rangeControl"/>
                    </div>
                </form>
            </div>
        )
    }

}

class Toggle extends React.Component {
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
            this.setState({
                insideText: this.props.text[1],
                toggle: false
            })
        } else {
            this.setState({
                insideText: this.props.text[0],
                toggle: true
            })
        }
    }

    render() {
        return (
            <div className="container p-3 my-3 border">
                <h1>{this.state.insideText}</h1>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>click</button>
            </div>
        )
    }
}

export {Toggle, Slider}
