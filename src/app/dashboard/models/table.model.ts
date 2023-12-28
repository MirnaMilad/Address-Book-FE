export interface Entry{
    id:number;
    fullName:string;
    job:Job;
    department:Department;
    mobileNumber:string;
    dateOfBirth:string;
    address:string;
    email:string;
    age:number;
}
export interface BaseEntity{
    id:number;
    title:string;
    description:string;
}
export interface Job extends BaseEntity{}
export interface Department extends BaseEntity{}

export interface Button{
    buttonName:string
  }
