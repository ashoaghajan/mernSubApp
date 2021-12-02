/// <reference types="react-scripts" />
type User = {
    data: { 
        id: string,
        email: string,
        customerStripeId: string
    } | null,
    error: string | null,
    loading: boolean
}

type Price = {
    id: string,
    nickname: string
    unit_amount: number
}

type Article = {
    content: string,
    imageUrl: string,
    title: string,
    _id: string
}