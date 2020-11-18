import React from "react";
import {Card} from "antd";

export class ArticleDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            article: {}
        }
    }

    componentDidMount() {
        const articleID = this.props.match.params.articleID
        const url = `http://127.0.0.1:8000/api/products/${articleID}`
        console.log('url:', url)
        fetch(url)
            .then(x => x.json())
            .then(y => {
                this.setState({article: y})
                console.log('data:', y)
            })
            .catch(e => console.log(e))
    }


    render() {
        return (
            <Card title={this.state.article.name}>
                <img src={`http://127.0.0.1:8000${this.state.article.image}`}/>
                <p>{this.state.article.description}</p>
            </Card>
        )
    }
}


export default ArticleDetail