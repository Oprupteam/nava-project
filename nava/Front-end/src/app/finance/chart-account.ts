export interface ChartAccount {



    accountId: string,
    parentAccount: string |null,
    accountName:  string,
    accountType:string,
    accountCode:string,
    accountDescription:string,
    deleteFlag: number,

     accountValue: number,
     transDebit: number,
     transCredit: number,
     finalBalance: number

}
