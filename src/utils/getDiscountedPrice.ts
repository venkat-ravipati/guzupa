export function getDiscountedPrice(price: number, discount: number): number {
    const discountedAmount= price * (discount/100);
    const discountedPrice  = price - discountedAmount;
    return Math.ceil(discountedPrice)
}