import { JobModel } from "../models/JobModel";
import { CVManager } from "../manager/CVManager";
import { CVModel } from "../models/CVModel";
import { JobManager } from "../manager/JobManager";

export class CVManagementViewModel {

    private jobManager: JobManager;
    

    constructor() {
        this.jobManager = new JobManager();
    }

    loadCVs(job: JobModel, callback: any): void {
        this.jobManager.loadCVs(job, callback);
    }

}