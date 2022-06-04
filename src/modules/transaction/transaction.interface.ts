export interface TransactionInterface {
    typeCode: number;
    typeName: string;
    iconImageUrl: string;
    categories: Array<CategoryInterface> | [];
} 

export interface CategoryInterface {
    categoryCode: number;
    name: string;
    iconImageUrl: string;
}