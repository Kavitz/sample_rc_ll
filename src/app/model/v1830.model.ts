export class V1830 {
}

export interface Vcenter {
    name: string;
    ipaddress: string;
    username: string;
    password: string;
}

export interface Ovf {
    name: string;
    product: string;
    version: string;
    url: string;
}

export interface SelectOpion {
	value: string;
	viewValue: string;
}

export interface ManageUsers {
    username: string;
    role: string;
    groupname: string;
}
