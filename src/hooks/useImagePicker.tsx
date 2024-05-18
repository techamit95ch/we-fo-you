import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
	type ImagePickerAsset,
	ImagePickerOptions,
	launchCameraAsync,
	launchImageLibraryAsync,
	MediaTypeOptions,
	useCameraPermissions,
	useMediaLibraryPermissions,
} from 'expo-image-picker';

const useImagePicker = ({
	multiple = false,
	allowsEditing = true,
	...props
}: Partial<ImagePickerOptions> & {
	multiple?: boolean;
}) => {
	const [image, setImage] = useState<ImagePickerAsset>();

	const [images, setImages] = useState<ImagePickerAsset[]>();

	const cameraPermission = useCameraPermissions();

	const mediaPermission = useMediaLibraryPermissions();

	const cancelImage = useCallback(() => {
		setImages(undefined);
		setImage(undefined);
	}, []);

	const openCamera = async () => {
		try {
			if (!cameraPermission[0]?.granted) {
				cameraPermission[1]();
			}
			const result = await launchCameraAsync({
				allowsEditing: allowsEditing,
				quality: 1,
				aspect: [4, 3],
				mediaTypes: MediaTypeOptions.Images,
				allowsMultipleSelection: multiple,
				...props,
			});

			if (result.canceled) {
				throw new Error('Cancelled');
			}
			setImage(result?.assets[0]);
			setImages(result?.assets);
		} catch (error) {
			Alert.alert('Can not open camera', (error as Error)?.message);
		}
	};

	const openLibrary = async () => {
		try {
			if (!mediaPermission[0]?.granted) {
				mediaPermission[1]();
			}
			const result = await launchImageLibraryAsync({
				allowsEditing: allowsEditing,
				quality: 1,
				aspect: [4, 3],
				mediaTypes: MediaTypeOptions.Images,
				allowsMultipleSelection: multiple,
				...props,
			});

			if (result.canceled) {
				throw new Error('Cancelled');
			}

			setImage(result?.assets[0]);
			setImages(result?.assets);
		} catch (error) {
			Alert.alert('Can not open galary', (error as Error)?.message);
		}
	};

	return { image, images, openCamera, openLibrary, cancelImage };
};

export default useImagePicker;
