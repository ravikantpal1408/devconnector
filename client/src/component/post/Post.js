import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostItem from '../posts/PostItem';
import { getPostUser } from '../../actions/postAction'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom';

class Post extends Component {

    componentDidMount() {
        this.props.getPostUser(this.props.match.params.id);
    }

    render() {
        const { post, loading } = this.props.post;

        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />
        } else {
            postContent = (<div>
                <PostItem post={post} showActions={false} />
            </div>)
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    getPostUser: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToUser = state => ({
    post: state.post
})
export default connect(mapStateToUser, { getPostUser })(Post);