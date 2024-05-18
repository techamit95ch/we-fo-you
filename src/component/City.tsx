import { Text, TouchableOpacity } from 'react-native';

import styles, { DARK_GRAY } from '../styles';

import Icon from './Icon';

const nework = 'New York' as const;

const City = () => (
	<TouchableOpacity style={styles.city}>
		<Text style={styles.cityText}>
			<Icon name="location-sharp" size={13} color={DARK_GRAY} />
			{nework}
		</Text>
	</TouchableOpacity>
);

export default City;
