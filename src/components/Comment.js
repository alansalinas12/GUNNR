import React, { Component } from 'react';
import { connect } from 'react-redux'
import MediumEditor from 'medium-editor'
import axios from 'axios'
import './../../node_modules/medium-editor/dist/css/medium-editor.min.css'

class Comment extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.publishComment = this.publishComment.bind(this)
    }

    writeComment() {

    }

    publishComment() {
        // check if user is signed in.
        if (Object.keys(this.props._user).length > 0) {
            // check if user is not the same person to follow
            if (this.props._user._id !== this.props.to_follow) {
                // check if you are not already following him
                if (this.props.user.indexOf(this.props.to_follow) === -1) {
                    this.props.follow(this.props._user._id, this.props.to_follow)
                }
            }
        } else {
            this.props.toggleOpen()
        }
    }

    handleClick() {
        console.log('clicked')
        this.refs.fileUploader.click()
    }


    componentDidMount() {
        const editor = new MediumEditor(/*dom, */".medium-editable", {
            autoLink: true,
            delay: 1000,
            targetBlank: true,
            toolbar: {
                buttons: [
                    'bold',
                    'italic',
                    'quote',
                    'underline',
                    'anchor',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'strikethrough',
                    'subscript',
                    'superscript',
                    'pre',
                    'image',
                    'html',
                    'justifyCenter'
                ],
                diffLeft: 25,
                diffTop: 10,
            },
            anchor: {
                placeholderText: 'Type a link',
                customClassOption: 'btn',
                customClassOptionText: 'Create Button'
            },
            paste: {
                cleanPastedHTML: true,
                cleanAttrs: ['style', 'dir'],
                cleanTags: ['label', 'meta'],
                unwrapTags: ['sub', 'sup']
            },
            anchorPreview: {
                hideDelay: 300
            },
            placeholder: {
                text: 'Description'
            }
            /*
            placeholder: { text: "Tell your Story ...", hideOnClick: true },
            toolbar: {
              buttons: ['bold', 'italic']
            } */
        })
        editor.subscribe('editableInput', (ev, editable) => {
            if (typeof document !== 'undefined')
                this.setState({
                    title: document.getElementById('editor-title').value,
                    text: editor.getContent(0),
                    description: `${editor.getContent(0).substring(0, 30).toString()}...`
                })
            console.log(this.state)
        })
    }
    render() {
        return (
            <div>
                <EditorHeader publish={this.publishWeapon} loading={this.state.loading} />
                <div className="container-fluid main-container">
                    <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                        <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
                            <div className="post-metadata">
                                <img alt={this.props.user.name} className="avatar-image" src={this.props.user.provider_pic} height="40" width="40" />
                                <div className="post-info">
                                    <div data-react-classname="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href="">{this.props.user.name}</a></span></div>
                                    <small>{this.props.user.email}</small>
                                </div>
                            </div>

                            <form className="editor-form main-editor" autoComplete="off" >

                                <div className={this.state.imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
                                    <img src="" alt="" id="image_preview" />
                                </div>

                                <div className="existing-img-previewer" id="existing-img-previewer">
                                </div>

                                <div className="form-group">
                                    <span className="picture_upload">
                                        <i className="fa fa-camera" onClick={this.handleClick}></i>
                                    </span>
                                </div>

                                <div className="form-group">
                                    <textarea col="1" className="editor-title" id="editor-title" placeholder="Title"></textarea>
                                </div>

                                <div className="form-group">
                                    <textarea id="medium-editable" className="medium-editable" ></textarea>
                                </div>

                                <div className="hidden">
                                    <input type="file" onChange={() => this.previewImg()} id="file" ref="fileUploader" />
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.authUser.user
    }
}
export default connect(mapStateToProps)(Comment);