import React, { Component } from 'react'

class AsideFeed extends Component {
    render() {
        const authors = this.props._weapons
            .map((_weapon) => {
                return _weapon.author.name
            }
            )
            .sort()
            .filter((a, b, self) => {
                return self.indexOf(a) === b
            })
            .map((__weapon) =>
                <a href='javascript:void(0);' className="tag">{__weapon}</a>
            )
        const top_weapons = this.props._weapons.map((_weapon, i) =>

            <li className="top-stories-list-item">
                <div className="count-button-wrapper">
                    <span className="count-button">{i}</span>
                </div>
                <div className="top-stories-links">
                    <a className="post-title" href={`/weaponview/${_weapon._id}`}>{_weapon.title}</a><br />
                    <small>
                        <div data-react-className="PopoverLink" data-react-props="">
                            <span className="popover-link" data-reactroot="">
                                <a href={`/profile/${_weapon.author._id}`}>{_weapon.author.name}</a>
                            </span>
                        </div>
                    </small>
                </div>
            </li>

        )
        return (
            <div>
                <aside className="col-md-4 main-sidebar">
                    <h4 className="small-heading border-top">Featured Members</h4>
                    <div data-react-className="TagList" data-react-props="">
                        <div className="tags-wrapper undefined" data-reactroot="">
                            {authors}
                        </div>
                    </div>


                    <h4 className="small-heading border-top">Top weapons</h4>
                    <div className="sidebar-top-stories">
                        <ul>
                            {top_weapons}
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}
export default AsideFeed