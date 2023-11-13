import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Dropdown } from 'semantic-ui-react'
import { countryOptions } from '../common.js'
import { JobDetailsCard } from './JobDetailsCard.jsx';
import { JobApplicant } from './JobApplicant.jsx';
import { ChildSingleInput } from '../../Form/SingleInput.jsx'
import { JobDescription } from './JobDescription.jsx';
import { JobSummary } from './JobSummary.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { useLocation } from 'react-router-dom';

export default class CreateJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: {
                id:"",
                employerID:"",
                title: "",
                description: "",
                summary: "",
                applicantDetails: {
                    yearsOfExperience: { years: 1, months: 1 },
                    qualifications: [],
                    visaStatus:[]
                },
                jobDetails: {
                    categories: { category: "", subCategory: "" },
                    jobType: [],
                    startDate: moment(),
                    salary: { from: 0, to: 0 },
                    location: { country: "", city: ""}
                }
            },
            loaderData: loaderData,
            editHeadingToggle: false
        }
        
  
        this.updateStateData = this.updateStateData.bind(this);
        this.addUpdateJob = this.addUpdateJob.bind(this);
        this.loadData = this.loadData.bind(this); 
   
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

    loadData() {
        //const urlParams = new URLSearchParams(window.location.search);

        // Extract the value of the 'id' parameter
        //var param = urlParams.get('id') || "";
        //const root = "" 
        //var param = root.getAttribute('data-id');
        var param = this.props.match.params.id ? this.props.match.params.id : "";//workaround till we get Redux in to keep the page from breaking
        var copyJobParam = this.props.match.params.copyId ? this.props.match.params.copyId : "";


        if (param != "" || copyJobParam != "") {
            var link = param != "" ? 'https://talentservicestalentharish.azurewebsites.net/listing/listing/GetJobByToEdit?id=' + param
                : 'https://talentservicestalentharish.azurewebsites.net/listing/listing/GetJobForCopy?id=' + copyJobParam;
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: link,
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    if (res.success == true) {
                        res.job.jobDetails.startDate = moment(res.job.jobDetails.startDate);
                        res.job.jobDetails.endDate = res.job.jobDetails.endDate ? moment(res.job.jobDetails.endDate) : null;
                        res.job.expiryDate = res.job.expiryDate
                            ? moment(res.job.expiryDate) > moment()
                                ? moment(res.job.expiryDate) : moment().add(14,'days') : null;
                        this.setState({
                            jobData: res.job,
                            editHeadingToggle: true
                        })
                        console.log(res.job)
                    } else {
                        TalentUtil.notification.show(res.message, "error", null, null)
                    }
                }.bind(this)
            })
        }       
    }
    addUpdateJob() {
        var jobData = this.state.jobData;
        console.log("data to save:", jobData);
        //jobData.jobDetails.startDate = jobData.jobDetails.startDate.toDate();
        console.log("date:", jobData.jobDetails.startDate);
        var cookies = Cookies.get('talentAuthToken');   
        $.ajax({
            url: 'https://talentservicestalentharish.azurewebsites.net/listing/listing/createUpdateJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType:'json',
            type: "post",
            data: JSON.stringify(jobData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show(res.message, "success", null, null);
                    window.location = "/ManageJobs";
                   
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }
                
            }.bind(this)
        })
    }

    updateStateData(event) {
        const data = Object.assign({}, this.state.jobData)
        data[event.target.name] = event.target.value
        this.setState({
            jobData:data
        })
        console.log(data);
    }
   
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="sixteen wide center aligned padded column">
                                    {this.state.editHeadingToggle? <h1>Edit Job</h1>:<h1>Create Job</h1>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="sixteen wide column">
                                    <div className="ui form">
                                        <div className="ui grid">
                                            <div className="row">
                                                <div className="twelve wide column">
                                                    <label>* are required fields. Please enter all required fields.</label>
                                                    <h5>
                                                        *Title:
                                                    </h5>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        name="title"
                                                        value={this.state.jobData.title}
                                                        controlFunc={this.updateStateData}
                                                        maxLength={80}
                                                        placeholder="Enter a title for your job"
                                                        errorMessage="Please enter a valid title"
                                                    />
                                                    <h5>
                                                        *Description:
                                                    </h5>
                                                    <JobDescription
                                                        description={this.state.jobData.description}
                                                        controlFunc={this.updateStateData}
                                                    />
                                                    <br />
                                                    <h5>
                                                        *Summary:
                                                    </h5>
                                                    <JobSummary
                                                        summary={this.state.jobData.summary}
                                                        updateStateData={this.updateStateData} />
                                                    <br />

                                                    <br />
                                                    <JobApplicant
                                                        applicantDetails={this.state.jobData.applicantDetails}
                                                        updateStateData={this.updateStateData}
                                                    />
                                                    <br />
                                                </div>
                                                <div className="four wide column">
                                                    <JobDetailsCard
                                                        expiryDate={this.state.jobData.expiryDate}
                                                        jobDetails={this.state.jobData.jobDetails}
                                                        updateStateData={this.updateStateData}
                                                        createClick={this.addUpdateJob}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </section>
            </BodyWrapper>
        )
    }
}