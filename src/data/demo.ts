const IMAGE_01 = require('../images/01.jpg');

const DEMO = [
	{
		id: 1,
		name: 'Leanne Graham',
		isOnline: true,
		match: '78',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		message:
			'I will go back to Gotham and I will fight men Iike this but I will not become an executioner.',
		image: IMAGE_01,
	},
	{
		id: 2,
		name: 'Clementine Bauch',
		match: '93',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: false,
		message: "Someone like you. Someone who'll rattle the cages.",
		image: IMAGE_01,
	},
	{
		id: 3,
		name: 'Ervin Howell',
		match: '45',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: false,
		message: 'Oh, hee-hee, aha. Ha, ooh, hee, ha-ha, ha-ha. And I thought my jokes were bad.',
		image: IMAGE_01,
	},
	{
		id: 4,
		name: 'John Lebsack',
		match: '88',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: true,
		message: "Bats frighten me. It's time my enemies shared my dread.",
		image: IMAGE_01,
	},
	{
		id: 5,
		name: 'James Dietrich',
		match: '76',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: false,
		message: "It's not who I am underneath but what I do that defines me.",
		image: IMAGE_01,
	},
	{
		id: 6,
		name: 'Patricia Schulist',
		match: '95',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: true,
		message:
			'You have nothing, nothing to threaten me with. Nothing to do with all your strength.',
		image: IMAGE_01,
	},
	{
		id: 7,
		name: 'Chelsey Weissnat',
		match: '67',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: true,
		message:
			"Never start with the head. The victim gets all fuzzy. He can't feel the next... See?",
		image: IMAGE_01,
	},
	{
		id: 8,
		name: 'Nicky Runol',
		match: '85',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		age: '27',
		location: 'Irvine, CA',
		info1: 'Straight, Single, 5"10',
		info2: 'Tea Totaller, Loves Photography & Travel',
		info3: 'Beaches, Mountain, Cafe, Movies',
		info4: 'Last seen: 23h ago',
		isOnline: true,
		message: "And as for the television's so-called plan, Batman has no jurisdiction.",
		image: IMAGE_01,
	},
	{
		id: 9,
		name: 'Glenna Reichert',
		match: '74',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: true,
		message: 'This is what happens when an unstoppable force meets an immovable object.',
		image: IMAGE_01,
	},
	{
		id: 10,
		name: 'Kurtis DuBuque',
		match: '98',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		isOnline: false,
		message: 'You want order in Gotham. Batman must take off his mask and turn himself in.',
		image: IMAGE_01,
	},
] as const;

export default DEMO;
