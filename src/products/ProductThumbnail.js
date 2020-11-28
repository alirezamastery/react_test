import React from 'react'
import { Link } from 'react-router-dom'


function ProductThumbnail({ product , className}) {
    const generalClassName = className ? className : 'container'
    const productLink = `/products/${product.slug}`
    return (
        <div className={generalClassName}>
            {/*you can also use <a> tag but I think it reloads the page*/}
            <Link to={productLink}>
                <img className="img-fluid mx-auto d-block"
                src={product.image} 
                alt={product.name} 
                style={{width:"220px",height:"220px"}}
                />
                <h5 className="mt-2">{product.name}</h5>
            </Link>
            <h5> قیمت: {product.price}</h5>
        </div>
    )
}

export default ProductThumbnail