import React from 'react';
require ('./Toggler.css.scss')

class Toggler extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    window.tog = this;
    let value = this.props.model[this.props.attr];

    return (
      <div className="toggler">
        <label className="toggle block">
          <p className='lbl'>{this.props.label}</p>
          <input type="checkbox" 
            value={value} 
            onChange={this.handleChange.bind(this)}
          />
          <div className="toggle_shape"></div>
        </label>
      </div> 
    )
  }

  handleChange() {
    this.props.model[this.props.attr] = !this.props.model[this.props.attr];
    this.forceUpdate()
    this.props.callback();
  }
}

export default Toggler;