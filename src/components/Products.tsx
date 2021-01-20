import React from 'react'
import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store/productSlice'

import { storeType } from '../store/store'

const Products = () => {
    const dispatch = useDispatch()

    const products = useSelector((state: storeType) => state)

    const addHandler = (id: number) => {
        const action = {
            type: actions.add,
            payload: id
        }
        dispatch(action)
    }

    return (
        <div>
            <Typography variant='h4'> Shirts </Typography>
            <Grid container spacing={3}>
                {products.map((product) => {
                    return (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Tooltip title='Click to add to basket'>
                                <Card style={{ height: '100%' }}>
                                    <CardActionArea onClick={() => addHandler(product.id)} style={{ height: '100%' }}>
                                        <CardMedia
                                            style={{ objectFit: 'cover' }}
                                            component='img'
                                            image={product.imageUrl}
                                        />
                                        <CardContent>
                                            <Typography variant='h5'> {product.title} </Typography>
                                            <Typography variant='body1'> {product.description} </Typography>
                                            <Typography variant='h6'> Price: ${product.price} </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Tooltip>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default Products
