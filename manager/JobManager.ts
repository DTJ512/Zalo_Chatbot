import { CVModel } from "../models/CVModel";
import { JobModel } from "../models/JobModel";
import { API } from "../utils/API";

class JobState {
    constructor(
        public id: string,
        public state: string
    ) { }
}

export class JobManager {

    private jobList: Array<JobModel> = [];
    private newJob: JobModel | undefined;
    private stateList: Array<JobState> = [];

    private apiJobs: string = API.jobAPI;
    private apiJobState: string = API.jobStateAPI;


    constructor() {
    }


    // TODO: update these methods to database 

    loadJobs(loading: any): void {
        if (this.jobList.length > 0) {
            return;
        }
        
        this.jobList = []; // load jobs from database

        const loadjob = fetch(this.apiJobs,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            }
        )
            .then(function(response) {
                return response.json();
            }).then(data => {
                data.forEach((job: any) => {
                    this.addJob(new JobModel(
                        job.id, 
                        job.title, 
                        (job.file? "file" : ""), // dont load file in initial, download when user click 
                        job.filename, 
                        job.state
                    ));
                });
            });
        const loadjobstate =  fetch(this.apiJobState,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                data.forEach((state: any) => {
                    this.stateList.push(new JobState(
                        state.id, 
                        state.stateString
                    ));
                });
            }).catch((error) => {
                console.error("Lỗi database: " + error);
            });

        Promise.all([loadjob, loadjobstate]).then(() => {
            loading(false);
        }).catch((error) => {
            console.error("Lỗi database: " + error);
        });

    }

    getStateList(): Array<JobState> {
        return this.stateList;
    }

    changeJobState(job: JobModel, state: string): void {
        // TODO: update job state in database
        job.state = state;
    }

    getJobState(job: JobModel): string {
        return (this.stateList[Number(job.state)].state);

        //return "mark";
        //return this.stateList[Number(job.state)].state;
    }

    getJobFile(job: JobModel): string {
        return job.file || "";
    }

    refreshJobs(callback: any): void {
        this.jobList = [];
        this.loadJobs(callback);
    }

    addJob(job: JobModel): void {
        this.jobList.push(job);
    }

    removeJob(job: JobModel): void {
        this.jobList = this.jobList.filter((j) => j !== job);
    }

    getJobs(): JobModel[] {
        return this.jobList;
    }

    getJobByTitle(title: string): JobModel | undefined {
        return this.jobList.find((j) => j.title === title);
    }

    updateJobTitle(job: JobModel, title: string): void {
// TODO: save new job to database
        job.changeTitle(title);
    }

    updateJobJDFilePath(job: JobModel, jdFilePath: string): void {
// TODO: save new job to database
        job.changeJDFilePath(jdFilePath);
    }

    updateJobFileName(job: JobModel, fileName: string): void {
        // TODO: save new job to database
        job.changeFileName(fileName);
    }

    getJobJDFilePath(job: JobModel): string {
        return job.file || "";
    }

    getJobFileName(job: JobModel): string {
        return job.fileName || "";
    }

    removeJobJDFilePath(job: JobModel): void {    
        // TODO: save new job to database
        job.removeJDFilePath();
    }

    openJobJDFile(job: JobModel): void {
        job.openJDFile();
    }

    downloadJobJDFile(job: JobModel): void {
        // TODO: download file from database
    }

    getJobTotalJD(job: JobModel): string {
        return job.file ? '1 JD' : '0 JD';
    }

    getJobTotalCV(job: JobModel): string {
        return job.cvManager ? job.cvManager.getCVs().length + ' CVs' : '0 CV';
    }

    initNewJob(title: string): void {
        // TODO: get available id from database
        let id = "0";
        for (let i = 0; i < this.jobList.length; i++) {
            if (Number(this.jobList[i].id) != i) {
                id = i.toString();
                break;
            }
        }
        if (id === "0") {
            id = (this.jobList.length + 1).toString();
        }
        while(id.length < 3) {id = "0" + id;}
        this.newJob = new JobModel(id, title);
        this.newJob.state = "1";
        this.newJob.fileName = "";
        this.newJob.file = "";
    }

    getNewJob(): JobModel | undefined {
        return this.newJob;
    }

    setNewJob(job: JobModel): void {
        this.newJob = job;
    }

    clearNewJob(): void {
        this.newJob = undefined;
    }

    saveNewJob(): void {
        let postApi = API.postJobAPI
        if (this.newJob) {
            this.addJob(this.newJob);
            fetch(postApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.newJob.id,
                    title: this.newJob.title,
                    file: this.newJob.file, // TODO: encript file before update to database
                    filename: this.newJob.fileName,
                    state: this.newJob.state
                })
            }).then(response => response.json())

        }
    }

    loadCVs(job: JobModel, callback: any): void {
        job.cvManager?.loadCVs(job.id, callback);
    }

    getCVs(job: JobModel): Array<CVModel> {
        return job.cvManager ? job.cvManager.getCVs() : [];
    }
}