import React, { useEffect } from 'react';
import Switch from 'react-switch';

import './index.scss';
import {GAClickEvent, GA_ACTION} from '../../utils/ga';

export const SnowSwitch = ({ checked, handleChange }) => {
	return (
		<div className="switch-container">
			<label htmlFor="normal-switch">
				<Switch
					onChange={() => {
						GAClickEvent('button', GA_ACTION.CLICK, 'snow')
						handleChange()
					}}
					checked={checked === 'off'}
					id="normal-switch"
					height={24}
					width={48}
					checkedIcon={<div className="icon checkedIcon">S</div>}
					uncheckedIcon={<div className="icon uncheckedIcon">N</div>}
					offColor={'#d9dfe2'}
					offHandleColor={'#fff'}
					onColor={'#999'}
					onHandleColor={'#282c35'}
				/>
			</label>
		</div>
	);
};
