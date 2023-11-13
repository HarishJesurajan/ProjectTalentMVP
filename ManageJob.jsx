import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            loading: true
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        //this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData()

    };

    loadData() {
        var link = 'https://talentservicestalentharish.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var link2 = 'https://talentservicestalentharish.azurewebsites.net/listing/listing/getEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link2,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    this.setState({
                        loadJobs: res.myJobs,
                        loading: false
                    })
                }
                console.log(this.state.loadJobs)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }

    handlePageChange(event, { activePage }) {
        this.setState({ activePage });
    }
    //loadnewdata(data) {
    //    var loader = this.state.loaderdata;
    //    loaderData.isloading = true;
    //    data[loaderData] = loader;
    //    this.setstate(data, () => {
    //        this.loadData(() => {
    //            loaderData.isloading = false;
    //            this.setstate({
    //                loaderata: loader
    //            })
    //        })
    //    });
    //}

    render() {
        const filterOptions = [
            { key: 'all', text: 'All Jobs', value: 'all' },
            { key: 'active', text: 'Active Jobs', value: 'active' },
            { key: 'closed', text: 'Closed Jobs', value: 'closed' },
            { key: 'expired', text: 'Expired Jobs', value: 'expired' },
            { key: 'unexpired', text: 'UnExpired Jobs', value: 'unexpired' },
            { key: 'draft', text: 'Draft Jobs', value: 'draft' }
        ];

        const sortOptions = [
            { key: 'asc', text: 'Ascending', value: 'asc' },
            { key: 'desc', text: 'Descending', value: 'desc' },
        ];
        return (
            <div>
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui container">
                        <h1>List of Jobs</h1>
                    </div>
                    <div className="ui container" style={{ color: "dark", marginTop:"2rem"}}>
                        <label style={{ width: "16rem" }}>
                            <FontAwesomeIcon icon={faFilter} style={{marginRight:"2px"}} />
                            Choose Filter :
                            <span style={{ marginLeft: "2px" }}><b style={{ color: "dark" }}><Dropdown placeholder="Choose filter" options={filterOptions} style={{color : "dark"} } /></b></span>
                        </label>
                        <label style={{ color: "dark", marginLeft: "20px" }} >
                            <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight:"2px" }} />
                            Filter by Date :
                            <span style={{ marginLeft: "2px" }}><b style={{ color: "dark" }}><Dropdown placeholder="Newest first" options={sortOptions} style={{ color: "dark" }} /></b></span>
                        </label>
                    </div>
                    <div className="ui container">
                        {this.state.loading ? <em>Loading...</em> :
                            this.state.loadJobs.length === 0 ? (
                                    <p>No jobs found</p>
                                ) : (
                                    <React.Fragment>
                                        <JobSummaryCard jobs={this.state.loadJobs} />
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                            <Pagination
                                                activePage={this.state.activePage}
                                                onPageChange={this.handlePageChange}
                                                totalPages={this.state.totalPages}
                                                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                                                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                                                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                                                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                                                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                                            />
                                        </div>
                                    </React.Fragment>
                                )
                            }
                    </div>
                </BodyWrapper>
            </div>
        )
    }
}                    

    