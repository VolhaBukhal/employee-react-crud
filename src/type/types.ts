export interface IEmployeeItem {
    name: string,
    salary: number;
    increase: boolean;
    id: number
}

export enum Filters {
    ALL = 'all',
    SALARY = 'salary',
    PROMOTE = 'promote'
}