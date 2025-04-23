export interface ICV {
    id: string;
    jobid: string;
    filename: string;
    file: string;
    percentage: number;
}

export class CVModel implements ICV {

    constructor(
        public id: string, 
        public jobid: string,
        public filename: string, 
        public file: string, 
        public percentage: number,
    ) {}
        
}
