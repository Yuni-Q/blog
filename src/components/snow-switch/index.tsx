import React, { useEffect } from 'react';
import Switch from 'react-switch';

import './index.scss';

export const SnowSwitch = ({ checked, handleChange }) => {
	return (
		<div className="switch-container" style={{ margin: '0 16px' }}>
			<label htmlFor="normal-switch">
				<Switch
					onChange={handleChange}
					checked={checked}
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
