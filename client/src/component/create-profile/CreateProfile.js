import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';



class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.prevetDefault();
        console.log('submit')
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fa fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fa fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fa fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Youtube Channel URL"
                        name="youtube"
                        icon="fa fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />


                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fa fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                </div>
            )
        }

        // select options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }

        ];
        return (
            <div className='create-profile'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">*=required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup placeholder="* Profile hanlde"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname" />
                                <SelectListGroup
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea where are you at your career" />
                                <TextFieldGroup placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for" />
                                <TextFieldGroup placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one" />
                                <TextFieldGroup placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Could be your own location or a company one" />
                                <TextFieldGroup placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="HTLM, CSS, javascript, java etc" />
                                <TextFieldGroup placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username" />
                                <TextAreaFieldGroup placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself" />

                                <div className="mb-3">
                                    <span className="btn btn-light"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}>
                                        Add Social Network Links
                                    </span>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

CreateProfile.propTypes = state => ({
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);