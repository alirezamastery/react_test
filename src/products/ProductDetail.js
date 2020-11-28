import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';

function ProductDetail(props) {
    const { slug } = useParams()
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log('in ProductDetail', data)

    const url = `products/${slug}`
    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get(url).then((res) => {
            setData(res.data);
        });
        setIsLoading(false)
    }, [setData]);

    if (isLoading) {
        return <h3>در حال بارگزاری...</h3>
    }
    else {
        return (
            <div className="container border mt-2 text-right">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-5 image-container border-left text-center p-2">
                        <img src={`http://127.0.0.1:8000${data.image}`}
                            alt={`image of ${data.name}`} />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-7 p-4">
                        <h2>{data.name}</h2>
                        <h3>قیمت : {data.price}</h3>
                    </div>
                </div>
                <hr/>
                <h5>توضیحات محصول:</h5>
                <p>{data.description}</p>
            </div>
        )
    }

}

export default ProductDetail
