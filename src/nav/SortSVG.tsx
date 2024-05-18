import Svg, { Path, SvgProps } from 'react-native-svg';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import ASSETS from '../../assets';

type IconProps = { focused?: boolean; size?: number; color?: string };

export const LOGO = ASSETS.icon;

export const SortSVG = (props: SvgProps) => (
	<Svg width={18} height={18} viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			d="M9.5 3v18M3.5 8.95l6-6M14.5 21.05v-18M14.5 21.05l6-6"
			stroke="#F44586"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export const HomeIcon = ({ size = 7, color }: IconProps) => (
	<Ionicons name="home" size={size} color={color} />
);

export const HeartIcon = ({ size = 7, color }: IconProps) => (
	<Ionicons name="heart" size={size} color={color} />
);

export const MessageIcon = ({ size = 7, color }: IconProps) => (
	<AntDesign name="message1" size={size} color={color} />
);

export const MoreIcon = ({ size = 7, color }: IconProps) => (
	<FontAwesome5 name="bars" size={size} color={color} />
);

export default SortSVG;
