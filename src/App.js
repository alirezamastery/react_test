import logo from './logo.svg';
import './App.css';
import Slider
    from "./components/slider";

function App() {
    const text1 = "this is a test"
    const text2 = "not any more"

    return (
        <div className="App">
            <Slider text={[text1, text2]}/>
        </div>
    );
}

export default App;
