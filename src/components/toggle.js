import React, {useState} from "react"


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

function Toggle() {
    const [text, setText] = useState('this is a test')
    const [toggle, setToggle] = useState(false)
    const handleClick = () => {
        if (!toggle) {
            console.log('if')
            setToggle(true)
            setText('not any more')
        } else {
            console.log('else')
            setToggle(false)
            setText('this is a test')
        }
    }

    return (
        <div className="container p-3 my-3 border">
            <h1>{text}</h1>
            <button type="button" className="btn btn-primary" onClick={handleClick}>click</button>
        </div>
    )

}

export {Toggle, Slider}
