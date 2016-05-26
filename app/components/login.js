import React, { Component,PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class Login extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    return (
      <Text>
        The current scene is titled {this.props.routes.scene.title}.
      </Text>
    );
  }
}

export default connect(({routes}) => ({routes}))(Login);
