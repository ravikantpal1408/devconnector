import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {


    constructor(props) {
        super(props);
        this.state = {
            clientId: 'f7d6b32f2b926367d14f',
            clientSecret: '965eada2e5f3c32acfb6fd6d17a1822c920349fc',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {

                if (this.refs.myRef) {
                    this.setState({ repos: data });
                    this.loadMyRepos(data)
                }

            }).catch(err => console.log(err))
    }


    loadMyRepos(repos) {

        if (repos.message === 'Not Found') {
            return (<div className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-12 m-auto">
                        <h4 className="display-4"> NO REPOSITORY FOUND </h4>
                    </div>
                </div>
            </div>);
        } else {


            return repos.map(repo => (
                <div key={repo.id} className="card card-body mb-2">
                    <div className="row">
                        <div className="col-md-6">
                            <h4><a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer" >{repo.name}</a></h4>
                            <p>{repo.description}</p>
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">
                                Stars: {repo.stargazers_count}
                            </span>
                            <span className="badge badge-secondary mr-1">
                                Watchers: {repo.watchers_count}
                            </span>
                            <span className="badge badge-success">
                                Forks: {repo.forks_count}
                            </span>

                        </div>
                    </div>
                </div>
            ))
        }
    }

    render() {

        const { repos } = this.state;

        let reposItems = this.loadMyRepos(repos);
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {reposItems}

            </div>
        )
    }
}
ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}
export default ProfileGithub;