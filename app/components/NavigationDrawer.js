import React,{ Component} from 'react'
import Drawer from 'react-native-drawer'
import {DefaultRenderer, Actions} from 'react-native-router-flux';

import SideMenu from './SideMenu';

export default class NavigationDrawer extends Component {
	render() {
		const state = this.props.navigationState;
		const children = state.children;
		return (
			<Drawer
				ref="navigation"
				type="displace"
				onOpen={() => Actions.refresh({ key: state.key, open: true })}
				onClose={() => Actions.refresh({ key: state.key, open: false })}
				content={<SideMenu />}
				tapToClose
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				negotiatePan
				acceptPan={true}
				panOpenMask={0.08}
				acceptTap={true}
				tweenHandler={(ratio) => ({
					main: { opacity: Math.max(0.54, 1 - ratio) },
				})}
			>
				<DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
			</Drawer>
		);
	}
}
