export type CompareExcelsUserType = {
    id: number,
    name: string,
    lastName: string,
    phone?: string,
    dni?: string,
    email: string,
    state?: boolean,
}

export type CompareResponse = { 
    fileName: string; 
    fileSize: string; 
}