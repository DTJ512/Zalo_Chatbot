import { JobManager } from "../manager/JobManager";
import { CVModel } from "../models/CVModel";
import { JobModel } from "../models/JobModel";

export class JDManagementViewModel {
    
    private jobManager: JobManager;

    constructor() {
        this.jobManager = new JobManager();
    }

    loadJobs(callback: any): void {
        this.jobManager.loadJobs(callback);
    }

    getJobs(): JobModel[] {
        return this.jobManager.getJobs();
    }

    getJobState(job: JobModel): string {
        return this.jobManager.getJobState(job);
    }

    getJobFile(job: JobModel): string {
        return this.jobManager.getJobFile(job);
    }

    getJobFileName(job: JobModel): string {
        return this.jobManager.getJobFileName(job);
    }

    refreshJobs(callback: any): void {
        this.jobManager.refreshJobs(callback);
    }

    getJobByTitle(title: string): JobModel | undefined {
        return this.jobManager.getJobByTitle(title);
    }

    updateJobTitle(job: JobModel, title: string): void {
        this.jobManager.updateJobTitle(job, title);
    }

    updateJobJDFilePath(job: JobModel, jdFilePath: string): void {
        this.jobManager.updateJobJDFilePath(job, jdFilePath);
    }

    updateJobFileName(job: JobModel, fileName: string): void {
        this.jobManager.updateJobFileName(job, fileName);
    }

    getJobJDFilePath(job: JobModel): string {
        return this.jobManager.getJobJDFilePath(job);
    }

    removeJobJDFilePath(job: JobModel): void {
        this.jobManager.removeJobJDFilePath(job);
    }

    openJobJDFile(job: JobModel): void {
        this.jobManager.openJobJDFile(job);
    }

    addJob(job: JobModel): void {
        this.jobManager.addJob(job);
    }

    removeJob(job: JobModel): void {
        this.jobManager.removeJob(job);
    }

    getJobTotalJD(job: JobModel): string {
        return this.jobManager.getJobTotalJD(job);
    }

    getJobTotalCV(job: JobModel): string {
        return this.jobManager.getJobTotalCV(job);
    }

    initNewJob(title: string): void {
        // TODO: check if the job already exists
        this.jobManager.initNewJob(title);
    }

    getNewJob(): JobModel | undefined {
        return this.jobManager.getNewJob();
    }

    setNewJob(job: JobModel): void {
        this.jobManager.setNewJob(job);
    }

    clearNewJob(): void {
        this.jobManager.clearNewJob();
    }


    saveNewJob(): void {
        if (!this.jobManager.getNewJob()?.title) {
            throw new Error("jobTitleRequired");
        }   
        if (this.getJobByTitle(this.jobManager.getNewJob()!.title)) {
            throw new Error("jobExisted");
        }
        this.jobManager.saveNewJob();
    }

    getJobManager(): JobManager {
        return this.jobManager;
    }

    getJobSate(job: JobModel): string {
        return this.jobManager.getJobState(job);
    }

    setJobState(job: JobModel, state: string): void {
        this.jobManager.changeJobState(job, state);
    }
}