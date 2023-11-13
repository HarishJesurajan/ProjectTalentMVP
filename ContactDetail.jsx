import React, { Component } from "react";
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Location } from '../Employer/CreateJob/Location.jsx';
export class IndividualDetailSection extends Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                firstName: "",
                lastName:"",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        console.log(this.props.componentId)
        console.log(this.state.newContact)
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)


        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="First Name"
                    name="firstName"
                    value={this.state.newContact.firstName}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your first name"
                    errorMessage="Please enter a valid first name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Last Name"
                    name="lastName"
                    value={this.state.newContact.lastName}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid last name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let firstName = this.props.details ? `${this.props.details.firstName}` : ""
        let lastName = this.props.details ? `${this.props.details.lastName}` : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""

        return (
            <div className='row ms-3' style={{marginLeft: "2px"} }>
                <div className="ui sixteen wide column ms-3">
                    <React.Fragment>
                        <p className="ms-3">First Name: {firstName}</p>
                        <p className="ms-3">Last Name: {lastName}</p>
                        <p className="ms-3">Email: {email}</p>
                        <p className="ms-3">Phone: {phone}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}


export class CompanyDetailSection extends Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                name: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit1 = this.openEdit1.bind(this)
        this.closeEdit1 = this.closeEdit1.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.saveContact1 = this.saveContact1.bind(this)
        this.renderEdit1 = this.renderEdit1.bind(this)
        this.renderDisplay1 = this.renderDisplay1.bind(this)
    }

    openEdit1() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit1() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange1(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact1() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit1()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit1() : this.renderDisplay1()
        )
    }

    renderEdit1() {
        let location = { city: '', country: '' }
        if (this.state.newContact && this.state.newContact.location) {
            location = this.state.newContact.location
        }

        return (
            <div className='ui sixteen wide column'>

               <ChildSingleInput
                        inputType="text"
                        label="Name"
                        name="name"
                        value={this.state.newContact.name}
                        controlFunc={this.handleChange1}
                        maxLength={80}
                        placeholder="Enter your company name"
                        errorMessage="Please enter a valid name"
                    />
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange1}
                    maxLength={80}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange1}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />
                Location:
                <Location location={location} handleChange={this.handleChange1} />
                <button type="button" className="ui teal button" onClick={this.saveContact1}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit1}>Cancel</button>
            </div>
        )
    }

    renderDisplay1() {

        let companyName = this.props.details ? this.props.details.name : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let location = {city:'',country:''}
        if (this.props.details && this.props.details.location) {
            location = this.props.details.location
        }

        return (
            <div className='row' style={{ marginLeft: "2px" }}>
                <div className="ui sixteen wide column" >
                    <React.Fragment>
                        <p style={{ marginleft: "20px" }}>Name: {companyName}</p>
                        <p style={{ marginleft: "20px" }}>Email: {email}</p>
                        <p style={{ marginleft: "20px" }}>Phone: {phone}</p>
                        <p style={{ marginleft: "20px" }}> Location: {location.city}, {location.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit1}>Edit</button>
                </div>
            </div>
        )
    }
}
