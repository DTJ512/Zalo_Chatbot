import { CVModel } from "../models/CVModel";
import SortingCriteria, { compare } from "./Enum";
import { API } from "../utils/API";

export class CVManager {

    private cvList: Array<CVModel> = [];
    private cacheList: Array<CVModel> = [];
    private sortCrit: SortingCriteria = 0;

    constructor() {
    }

    loadCVs(jobid: string, loading: any): void {
        if (this.cvList.length > 0) {
            return;
        }
        this.cvList = []; // load cvs from database

        const loadCV = fetch(API.cvAPI,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                data.forEach((CV: any) => {
                    if(CV.jobId === jobid) {
                        this.cvList.push(new CVModel(
                            CV.id,
                            CV.jobId,
                            CV.cv,
                            CV.file,
                            CV.percentage,
                        ));
                    }  
                });
            }).catch((error) => {
                console.error("Lỗi database: " + error);
            });


        Promise.all([loadCV]).then(() => {
            // filter cv by jobid
            loading(false);
        }).catch((error) => {
            console.error("Lỗi database: " + error);
        });
    }

    addCV(cv: CVModel): void {
        this.cvList.push(cv);
    }

    getCVs(): CVModel[] {
        return this.cvList;
    }

    removeCV(cvId: string): void {
        this.cvList = this.cvList.filter((item) => item.id !== cvId);

        // remove cv from database
        fetch(API.cvAPI + '/' + cvId,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log("CV removed: " + data);
        }).catch((error) => {
            console.error("Lỗi database: " + error);
        });

    }

    getCVById(cvId: string): CVModel | undefined {
        return this.cvList.find((cv) => cv.id === cvId);
    }

    sortCVs(crit: SortingCriteria): void {
        this.cvList.sort((a, b) => {
            return compare(a, b, crit);
        });
        this.sortCrit = crit;
    }

    filterCVs(from: number, to: number): void {
        this.cvList = this.cvList.concat(this.cacheList);
        this.cacheList = [];
        
        if (from === 0 && to === 100) {
            this.sortCVs(this.sortCrit);
            return;
        }

        this.cacheList = this.cvList.filter((cv) => {
            return (cv.percentage > to || cv.percentage < from);
        })
        this.cvList = this.cvList.filter((cv) => {
            return (cv.percentage <= to && cv.percentage >= from);
        });

        this.sortCVs(this.sortCrit);
    }

}