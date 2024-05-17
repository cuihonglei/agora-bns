// Used for the firebase storage operations. like upload images, etc.

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../_utils/firebase';

// Upload product images.
// TODO Support multiple images.
// @param image: the image from the upload form.
// @return the image url.
export const uploadProductImages = async (image) => {

  console.log("Uploading image", image.name);

  const imageName = `${Date.now()}_${image.name}`;
  const imageRef = ref(storage, `products/${imageName}`);
  const snapshot = await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(snapshot.ref);

  console.log("Image URL", imageUrl);

  return imageUrl;
};