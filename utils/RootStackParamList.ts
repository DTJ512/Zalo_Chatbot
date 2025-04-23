import {JobModel} from "../models/JobModel";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    JDManagement: undefined;
    AddJob: {jobModel: JobModel};
    JobDetail: {jobModel: JobModel};
    CVManagement: undefined;
    CVList: undefined;
};