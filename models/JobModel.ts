import { CVManager } from "../manager/CVManager";

export interface IJob {
    id: string;
    title: string;
    file?: string; // file path
    fileName?: string; // file name
    state?: string;
    cvManager?: CVManager;
}

/**
 * @class **JobModel**
 * represents a job in the system.
 * @field **title** the title of the job
 * @field **file** the file path of the job description
 * @field **cvManager** the cv manager of the job
 */

export class JobModel implements IJob {
    
    constructor(
        public id: string,
        public title: string, 
        public file?: string,
        public fileName?: string,
        public state?: string,
        public cvManager?: CVManager
    ) {
        cvManager = new CVManager();
    }

    changeTitle(title: string): void {
        this.title = title;
    }

    changeJDFilePath(jdFilePath: string): void {
        this.file = jdFilePath;
    }

    changeFileName(fileName: string): void {
        this.fileName = fileName;
    }

    removeJDFilePath(): void {
        this.file = "";
    }

    openJDFile(): void {
        // TODO: open the file
        
    }

    getID(): string {
        return this.id || "";
    }

}