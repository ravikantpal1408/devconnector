import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames'
import { Link } from 'react-router-dom';
import { deletePost, removeLike, addLike } from '../../actions/postAction';


class PostItem extends Component {


    onDeleteClick(id) {

        this.props.deletePost(id);
    }

    onLikeClick(id) {

        this.props.addLike(id);
    }

    onUnLikeClick(id) {

        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        const { post, auth, showActions } = this.props;


        return (
            <div>
                <div className="card card-body mb-3">
                    <div className="row">
                        <div className="col-md-2">
                            <a href="profile.html">
                                <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                            </a>
                            <br />
                            <p className="text-center">{post.name}</p>
                        </div>
                        <div className="col-md-10">
                            <p className="lead">{post.text}</p>
                            {showActions ? (<span>
                                <span style={{ cursor: 'pointer' }} onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                                    <i className={classnames('fa fa-thumbs-up', { 'text-info': this.findUserLike(post.likes) })}></i>
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </span>
                                <span style={{ cursor: 'pointer' }} onClick={this.onUnLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                                    <i className="text-secondary fa fa-thumbs-down"></i>
                                </span>
                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                                {
                                    post.user === auth.user.id ? (<span style={{ cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this, post._id)} className="btn btn-danger mr-1">
                                        <i className="fa fa-times" />
                                    </span>) : null
                                }
                            </span>) : null}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProp = state => ({
    auth: state.auth
})

export default connect(mapStateToProp, { deletePost, removeLike, addLike })(PostItem);