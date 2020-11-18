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
        console.log('props:' , this.props)
        const articleID = this.props.match.params.id
        const url = `http://127.0.0.1:8000/api/products/${articleID}`
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
            <Card title={this.state.article.title}>
                <p>{this.state.article.content}</p>
            </Card>
        )
    }
}


export default ArticleDetail