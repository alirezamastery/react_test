import React from "react";
import Articles from "../components/Products";
import {Space} from "antd";

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}


export class ArticleList extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        const url = "http://127.0.0.1:8000/api/products/"
        fetch(url)
            .then(x => x.json())
            .then(y => {
                this.setState({articles:y})
                console.log('data:' , y)
            }).catch(e=>console.log(e))
    }


    render() {
        return (
            <Articles data={this.state.articles}/>
        )
    }
}


export default ArticleList