import React, { Component } from 'react';
import { connect } from 'react-redux'
import { GoogleLogout } from 'react-google-login'
import {
    SignOutUser,
    toggleClose,
    toggleOpen
} from './../redux/actions/actions'

class SignOutWith extends Component {

    render() {
        const logout = (res) => {
            this.props.SignOutUser()
            this.props.toggleClose()
        }

        return (
            <div>
                <div data-behavior="overlay" className={this.props.modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
                    <button onClick={this.props.toggleClose} data-behavior="close-overlay" type="button" className="overlay-close"><span className="glyphicon glyphicon-remove"></span></button>
                    <nav>
                        <h2 className="grayed-heading center">Logout</h2>
                        <ul className="omniauth-button-group">

                            <li className="omniauth-button google">
                                <GoogleLogout
                                    buttonText="Logout"
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    }
}

export default connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignOutUser
})(SignOutWith);