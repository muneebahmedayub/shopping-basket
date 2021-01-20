import { createSlice } from "@reduxjs/toolkit";

import blueShirt from '../images/blue-shirt.png'
import redShirt from '../images/red-shirt.png'
import blackShirt from '../images/black-shirt.png'

interface ProductItem {
    id: number
    title: string
    description: string
    price: number
    imageUrl: string
    added?: boolean
    amount: number
}

const initialState: ProductItem[] = [
    {
        id: 123,
        title: 'Blue T-Shirt',
        description: 'No fancy sizing charts here, one t-shirt size to rule them all',
        price: 399,
        imageUrl: blueShirt,
        amount: 0
    },
    {
        id: 456,
        title: 'Black T-Shirt',
        description: 'This unique t-shirt is guaranteed to fit nobody, not even new born babies',
        price: 499,
        imageUrl: redShirt,
        amount: 0
    },
    {
        id: 789,
        title: 'Red T-Shirt',
        description: 'The only product on our site that might actually be worth buying',
        price: 799,
        imageUrl: blackShirt,
        amount: 0
    }
]

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            return state.map((item) => {
                if (item.id !== action.payload) return item
                return {
                    ...item,
                    added: true,
                    amount: item.amount + 1
                }
            })
        },
        subtract: (state, action) => {
            return state.map((item) => {
                if (item.id !== action.payload) return item

                return {
                    ...item,
                    amount: item.amount - 1
                }
            })
        },
        delete: (state, action) => {
            return state.map((item => {
                if (item.id !== action.payload) return item

                return {
                    ...item,
                    added: false,
                    amount: 0
                }
            }))
        }
    }
})

export const actions = productSlice.actions

export default productSlice.reducer