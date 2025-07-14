/**
 * TravelTurkey - Camera Hook (2025)
 * React hook for camera functionality in profile screens
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  showPhotoOptions,
  takePhoto,
  selectFromGallery,
  savePhotoToAppDirectory,
  PhotoResult,
  CameraOptions,
} from '../services/camera/CameraService';

interface UseCameraReturn {
  isLoading: boolean;
  selectedPhoto: PhotoResult | null;
  showPhotoSelector: () => Promise<void>;
  takeNewPhoto: (options?: CameraOptions) => Promise<void>;
  selectFromGalleryDirect: (options?: CameraOptions) => Promise<void>;
  clearPhoto: () => void;
  savePhoto: (fileName?: string) => Promise<string | null>;
}

export const useCamera = (): UseCameraReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoResult | null>(null);

  const showPhotoSelector = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await showPhotoOptions();
      if (result) {
        setSelectedPhoto(result);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const takeNewPhoto = useCallback(async (options?: CameraOptions) => {
    setIsLoading(true);
    try {
      const result = await takePhoto(options);
      if (result) {
        setSelectedPhoto(result);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectFromGalleryDirect = useCallback(
    async (options?: CameraOptions) => {
      setIsLoading(true);
      try {
        const result = await selectFromGallery(options);
        if (result) {
          setSelectedPhoto(result);
        }
      } catch (error) {
        console.error('Error selecting from gallery:', error);
        Alert.alert('Hata', 'Galeriden fotoğraf seçilirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearPhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const savePhoto = useCallback(
    async (fileName?: string): Promise<string | null> => {
      if (!selectedPhoto) {
        return null;
      }

      setIsLoading(true);
      try {
        const savedPath = await savePhotoToAppDirectory(
          selectedPhoto.uri,
          fileName,
        );
        return savedPath;
      } catch (error) {
        console.error('Error saving photo:', error);
        Alert.alert('Hata', 'Fotoğraf kaydedilirken bir hata oluştu.');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [selectedPhoto],
  );

  return {
    isLoading,
    selectedPhoto,
    showPhotoSelector,
    takeNewPhoto,
    selectFromGalleryDirect,
    clearPhoto,
    savePhoto,
  };
};
