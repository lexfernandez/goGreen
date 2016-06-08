import React,{ Component} from 'react'
import Launch from './Launch'
import Drawer from 'react-native-drawer'
import {DefaultRenderer} from 'react-native-router-flux';

export default class NavigationDrawer extends Component {
	constructor(props){
		super(props);
	}
  render(){
    const navigationState = this.props.navigationState;
    let selected = navigationState.children[navigationState.index];
    // var activeScene = (selected.name == "root" : selected[0] ? selected);
		const children = this.props.navigationState.children;
    return (

        <Drawer
            ref="navigation"
            type="displace"
            content={<Launch />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
              <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}  key={selected.key} {...selected} />
        </Drawer>
    );
  }
}
