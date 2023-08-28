export interface Listing {
    id: string
    addressStreet: string
    price: string
    image: string
}

export interface Details {
    id: string
    description: string
    address: string[]
    price: number
    amenities: string
    image: string
}