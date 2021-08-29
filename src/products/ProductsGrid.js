import React from 'react'
import ProductThumbnail from './ProductThumbnail'
import Grid from '@material-ui/core/Grid';
import GifLoader from 'react-gif-loader';

function ProductGrid({ isLoading, products }) {
    if (isLoading) { //700px height is for scroll bar to always show so we don't have flicker on changing the ordering
        return (
            <div style={{ height: "700px" }}>
                <GifLoader
                    loading={true}
                    imageSrc="../giphy.gif"
                    // imageStyle={imageStyle}
                    overlayBackground="rgba(0,0,0,0.5)"
                />
            </div>
        )
    }
    return (
        <Grid container spacing={0} alignItems="flex-start">
            {products.map((item) => {
                return (
                    <Grid item key={item.id} xs={12} md={6} lg={4}>
                        <ProductThumbnail
                            product={item}
                            className='text-center py-1 border text-dark'
                            key={item.id}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ProductGrid