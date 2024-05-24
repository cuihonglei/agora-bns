import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../_utils/firebase';

// Upload multiple product images and return their URLs.
export const uploadProductImages = async (images) => {
  console.log("Uploading images", images);
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const imageName = `${Date.now()}_${image.name}`;
      const imageRef = ref(storage, `products/${imageName}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    })
  );
  console.log("Image URLs", imageUrls);
  return imageUrls;
};
