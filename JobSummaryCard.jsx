import React from 'react';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseJob = this.handleCloseJob.bind(this)
        this.state = {
            loadJobs: props.jobs,
            jobData:[]
        }
        console.log(this.state.loadJobs)
    }

    handleCloseJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'https://talentservicestalentharish.azurewebsites.net/listing/listing/closeJob',
        $.ajax({
            url: 'https://talentservicestalentharish.azurewebsites.net/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(id),
            success: function (res) {
                if (res.success) {
                    TalentUtil.notification.show("Job closed successfully", "success", null);
                    this.setState({ loadJobs: res.job })
                }
                else {
                    TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
                }
            }.bind(this),
            error: function (res) {
                TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
            }.bind(this)
        })
    }

    //handleEditJob(id) {
        //var link = 'https://talentservicestalentharish.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        //var link2 = 'https://talentservicestalentharish.azurewebsites.net/listing/listing/GetJobByToEdit';
        //var cookies = Cookies.get('talentAuthToken');
        //$.ajax({
        //    url: link2,
        //    headers: {
        //        'Authorization': 'Bearer ' + cookies,
        //        'Content-Type': 'application/json'
        //    },
        //    type: "GET",
        //    contentType: "application/json",
        //    dataType: "json",
        //    data: JSON.stringify(id),
        //    success: function (res) {
        //        if (res.success) {
        //            this.setState({ jobData: res.job })
        //        }
        //        console.log(this.state.loadJobs)
        //    }.bind(this),
        //    error: function (res) {
        //        console.log(res.status)
        //    }
        //})
        //this.init()
    //}


    render() {
        return (
        <div>
                <div className= "d-flex flex-row flex-wrap justify-content-start ms-200px bd-highlight mb-3">
                {this.state.loadJobs.map(job =>
                    <Card className="p-2 bd-highlight" style={{ width: '30rem', margin: '10px' }} key={job.id}>
                        <Card.Header style={{color: "#0C4998" }}>
                            <Card.Title style={{ marginTop: "0.1rem", marginBottom: "1rem", color:"light"}}>{job.title}</Card.Title>
                        </Card.Header>
                        <Card.Body style={{ outerHeight: "10rem" }}>
                            <Card.Text style={{color:"grey"} }>
                                {job.location.city + ", " + job.location.country}
                            </Card.Text>
                            <Card.Text>
                                {job.summary}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            
                            <div className="d-flex flex-row justify-content-end" style={{ marginTop: "0.1rem", marginBottom: "0.1rem" }}>
                                {job.status === 1 ? <Button variant="danger" style={{ color: "light", marginRight: "7rem"}}>closed</Button> : <div></div>}
                                <Button variant="light" onClick={()=>this.handleCloseJob(job.id)} style={{ borderColor: "#0C4998", color: "#0C4998" }} ><FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: '2px' }} />Close</Button>
                                <Link to={`/EditJob/${job.id}`}>
                                    <Button variant="light" disabled={job.status===0? false:true} style={{ borderColor: "#0C4998", color: "#0C4998" }}><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '2px' }} />Edit</Button>
                                </Link>
                                <Button variant="light" style={{ borderColor: "#0C4998", color: "#0C4998" }}><FontAwesomeIcon icon={faCopy} style={{ marginRight: '2px' }} />copy</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                )}
            </div>
        </div>
            )
    }
}