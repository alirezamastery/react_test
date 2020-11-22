import React from 'react'
import { Link } from 'react-router-dom'


function ProductThumbnail({ product , className}) {
    const generalClassName = className ? className : 'container'
    const productLink = `/products/${product.slug}`
    return (
        <div className={generalClassName}>
            {/*you can also use <a> tag but I think it reloads the page*/}
            <Link to={productLink}>
                <img className="img-thumbnail img-fluid" src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
            </Link>
            <p> قیمت: {product.price}</p>
        </div>
    )
}

export default ProductThumbnail