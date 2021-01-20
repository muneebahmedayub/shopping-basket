import React from 'react'
import { Backdrop, Card, CardContent, Fade, List, ListItem, ListItemText, makeStyles, Modal, Typography, Divider, Button, IconButton, Badge, Grid, Avatar, ListItemAvatar, useMediaQuery, useTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { storeType } from '../store/store'
import { actions } from '../store/productSlice'
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    modalOpen: boolean
    setModalOpen: (modalOpen: boolean) => void
}

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto'
    }
})

const Basket: React.FC<Props> = ({ modalOpen, setModalOpen }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const smallUp = useMediaQuery(theme.breakpoints.up('sm'))

    const products = useSelector((state: storeType) => state)
    const items = products.map(product => product.amount).reduce((a, b) => a + b)

    const addedProducts = products.filter(item => item.added)

    const totalArr = products.map(item => {
        return item.price * item.amount
    })

    const total = totalArr.reduce((a, b) => a + b)

    const addHandler = (id: number) => {
        const action = {
            type: actions.add,
            payload: id
        }
        dispatch(action)
    }

    const subtractHandler = (id: number) => {
        const action = {
            type: actions.subtract,
            payload: id
        }
        dispatch(action)
    }

    const deleteHandler = (id: number) => {
        const action = {
            type: actions.delete,
            payload: id
        }
        dispatch(action)
    }

    const content = (
        <Card>
            <CardContent>
                <Typography variant='h5' color='primary'>Shopping Basket</Typography>
                <Typography variant='body1'>You have {items} in your basket</Typography>
                <List style={{ width: '100%' }}>
                    {addedProducts.map((product) => {
                        return (
                            <>
                                <ListItem>
                                    <Grid container>
                                        <Grid container item xs={12} justify='space-between'>
                                            <Grid item>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <img src={product.imageUrl} alt="" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={product.title} secondary={<>  {product.description} <Typography variant='body1'>$ {product.price} </Typography> </>} />
                                            </Grid>
                                            <Grid item>
                                                <IconButton onClick={() => deleteHandler(product.id)}>
                                                    <Badge>
                                                        <DeleteIcon />
                                                    </Badge>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => subtractHandler(product.id)}
                                                disabled={product.amount === 1 ? true : false}>-</Button>
                                            <span> {product.amount} </span>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => addHandler(product.id)}
                                            >+</Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                            </>
                        )
                    })}
                </List>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant='h5' style={{ flex: 1 }}>Total: </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5'>${total}</Typography>
                    </Grid>
                </Grid>
                <Button variant='contained' color='secondary' size='small' onClick={() => setModalOpen(false)}>Close</Button>
            </CardContent>
        </Card>
    )

    return (
        <div>
            {smallUp ? (
                <Modal
                    className={classes.modal}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={modalOpen}>
                        {content}
                    </Fade>
                </Modal>
            )
                :
                (
                    <div>
                        {content}
                    </div>
                )
            }
        </div>
    )
}

export default Basket
