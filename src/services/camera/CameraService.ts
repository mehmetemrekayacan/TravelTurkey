/**
 * TravelTurkey - Camera Service (2025)
 * Photo capture functionality for profile and place reviews
 */

import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
  Asset,
  CameraOptions as RNImagePickerCameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import RNFS from 'react-native-fs';

export interface CameraOptions {
  mediaType?: MediaType;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  allowsEditing?: boolean;
  selectionLimit?: number;
}

export interface PhotoResult {
  uri: string;
  fileName: string;
  fileSize: number;
  width: number;
  height: number;
  type: string;
}

/**
 * Request camera permissions for Android
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true; // iOS handles permissions automatically
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Kamera İzni',
        message: 'TravelTurkey fotoğraf çekmek için kamera erişimi istiyor.',
        buttonNeutral: 'Daha Sonra Sor',
        buttonNegative: 'İptal',
        buttonPositive: 'Tamam',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Camera permission error:', err);
    return false;
  }
};

/**
 * Request storage permissions for Android
 */
export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Depolama İzni',
        message:
          'TravelTurkey galeriden fotoğraf seçmek için depolama erişimi istiyor.',
        buttonNeutral: 'Daha Sonra Sor',
        buttonNegative: 'İptal',
        buttonPositive: 'Tamam',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Storage permission error:', err);
    return false;
  }
};

/**
 * Show photo selection options
 */
export const showPhotoOptions = (): Promise<PhotoResult | null> => {
  return new Promise(resolve => {
    Alert.alert(
      'Fotoğraf Seç',
      'Fotoğrafı nasıl eklemek istiyorsunuz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
          onPress: () => resolve(null),
        },
        {
          text: 'Galeriden Seç',
          onPress: () => selectFromGallery().then(resolve),
        },
        {
          text: 'Fotoğraf Çek',
          onPress: () => takePhoto().then(resolve),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(null) },
    );
  });
};

/**
 * Launch camera to take photo
 */
export const takePhoto = async (
  options?: CameraOptions,
): Promise<PhotoResult | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert(
      'İzin Gerekli',
      'Kamera kullanmak için izin vermeniz gerekiyor.',
    );
    return null;
  }

  const defaultOptions: RNImagePickerCameraOptions = {
    mediaType: 'photo',
    quality: 0.8 as any, // Type assertion to handle PhotoQuality
    maxWidth: 1920,
    maxHeight: 1080,
    includeBase64: false,
    saveToPhotos: true,
    ...options,
  };

  return new Promise(resolve => {
    launchCamera(defaultOptions, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        resolve(null);
        return;
      }

      const asset = response.assets?.[0];
      if (asset && asset.uri) {
        resolve({
          uri: asset.uri,
          fileName: asset.fileName || `photo_${Date.now()}.jpg`,
          fileSize: asset.fileSize || 0,
          width: asset.width || 0,
          height: asset.height || 0,
          type: asset.type || 'image/jpeg',
        });
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Select photo from gallery
 */
export const selectFromGallery = async (
  options?: CameraOptions,
): Promise<PhotoResult | null> => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      'İzin Gerekli',
      'Galeriye erişim için izin vermeniz gerekiyor.',
    );
    return null;
  }

  const defaultOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8 as any,
    maxWidth: 1920,
    maxHeight: 1080,
    includeBase64: false,
    selectionLimit: 1,
    ...options,
  };

  return new Promise(resolve => {
    launchImageLibrary(defaultOptions, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        resolve(null);
        return;
      }

      const asset = response.assets?.[0];
      if (asset && asset.uri) {
        resolve({
          uri: asset.uri,
          fileName: asset.fileName || `photo_${Date.now()}.jpg`,
          fileSize: asset.fileSize || 0,
          width: asset.width || 0,
          height: asset.height || 0,
          type: asset.type || 'image/jpeg',
        });
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Select multiple photos from gallery
 */
export const selectMultiplePhotos = async (
  limit: number = 5,
  options?: CameraOptions,
): Promise<PhotoResult[]> => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      'İzin Gerekli',
      'Galeriye erişim için izin vermeniz gerekiyor.',
    );
    return [];
  }

  const defaultOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8 as any,
    maxWidth: 1920,
    maxHeight: 1080,
    includeBase64: false,
    selectionLimit: limit,
    ...options,
  };

  return new Promise(resolve => {
    launchImageLibrary(defaultOptions, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        resolve([]);
        return;
      }

      const results: PhotoResult[] = [];
      response.assets?.forEach((asset: Asset) => {
        if (asset.uri) {
          results.push({
            uri: asset.uri,
            fileName: asset.fileName || `photo_${Date.now()}.jpg`,
            fileSize: asset.fileSize || 0,
            width: asset.width || 0,
            height: asset.height || 0,
            type: asset.type || 'image/jpeg',
          });
        }
      });

      resolve(results);
    });
  });
};

/**
 * Save photo to app directory
 */
export const savePhotoToAppDirectory = async (
  photoUri: string,
  fileName?: string,
): Promise<string | null> => {
  try {
    const appDirectory = `${RNFS.DocumentDirectoryPath}/photos`;

    // Create photos directory if it doesn't exist
    const dirExists = await RNFS.exists(appDirectory);
    if (!dirExists) {
      await RNFS.mkdir(appDirectory);
    }

    const finalFileName = fileName || `photo_${Date.now()}.jpg`;
    const destinationPath = `${appDirectory}/${finalFileName}`;

    await RNFS.copyFile(photoUri, destinationPath);
    return destinationPath;
  } catch (error) {
    console.error('Error saving photo:', error);
    return null;
  }
};

/**
 * Delete photo from app directory
 */
export const deletePhoto = async (photoPath: string): Promise<boolean> => {
  try {
    const exists = await RNFS.exists(photoPath);
    if (exists) {
      await RNFS.unlink(photoPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting photo:', error);
    return false;
  }
};

/**
 * Get photo info
 */
export const getPhotoInfo = async (photoPath: string) => {
  try {
    const stat = await RNFS.stat(photoPath);
    return {
      size: stat.size,
      mtime: stat.mtime,
      exists: true,
    };
  } catch (error) {
    return {
      size: 0,
      mtime: null,
      exists: false,
    };
  }
};
