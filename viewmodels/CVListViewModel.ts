import { CVManager } from "../manager/CVManager";
import { CVModel } from "../models/CVModel";
import { JobModel } from "../models/JobModel";

export class CVListViewModel {

    private cvManager: CVManager;
    private job: JobModel


    constructor(jobModel: JobModel) {
        this.cvManager = new CVManager();
        this.job = jobModel;
    }

    getJobTitle(): string {
        return this.job.title;
    }

    loadCVs(loading: any): void {
        this.cvManager.loadCVs(this.job.id, loading);
    }

    getCVs(): Array<CVModel> {
        return this.cvManager.getCVs();
    }

    getCVById(cvId: string): CVModel | undefined {
        return this.cvManager.getCVById(cvId);
    }

    addCV(cv: CVModel): void {
        this.cvManager.addCV(cv);
    }

    removeCV(cvId: string): void {
        this.cvManager.removeCV(cvId);
    }

    sortCVs(sortCrit: number): void {
        this.cvManager.sortCVs(sortCrit);
    }

    filterCVs(fromPercent: number, toPercent: number): void {
        //TODO: handle input validation
        this.cvManager.filterCVs(fromPercent, toPercent);
    }
    
}