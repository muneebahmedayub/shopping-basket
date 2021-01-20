import React from 'react'
import { AppBar, Toolbar, makeStyles, Typography, IconButton, Badge, Tooltip } from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector } from 'react-redux';
import { storeType } from '../store/store'

interface Props {
    setModalOpen: (modalOpen: boolean) => void
}

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
})

const Header: React.FC<Props> = ({setModalOpen}) => {
    const classes = useStyles()
    const products = useSelector((state: storeType) => state)




    const totalProducts = products.map(item => item.amount).reduce((a, b) => a + b)

    // setTotal(products.map(item => item.amount).reduce((a, b) => a + b))


    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title} variant='h3'>Clothy</Typography>
                    <Tooltip title='Shopping Basket' interactive>
                        <IconButton onClick={() => setModalOpen(true)}>
                            <Badge badgeContent={totalProducts} color='secondary'>
                                <ShoppingBasketIcon style={{ color: 'white' }} fontSize='large' />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
