import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyTabBar from './MyTabBar';

import EditContactInformation from '@/screens/main/profile/EditContactInformation';
import EditPhotos from '@/screens/main/settings/EditPhotos';
import EditPreference from '@/screens/main/settings/EditPreference';

export const EditProfileTab = createMaterialTopTabNavigator();

export const EditNav = () => (
	<EditProfileTab.Navigator initialRouteName="Basic" tabBar={(props) => <MyTabBar {...props} />}>
		<EditProfileTab.Screen name="Basic" component={EditContactInformation} />
		<EditProfileTab.Screen name="Dating" component={EditPreference} />
		<EditProfileTab.Screen name="Photos" component={EditPhotos} />
	</EditProfileTab.Navigator>
);

export default EditNav;
