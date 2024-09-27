// hooks/usePreprocessImage.js

import * as tf from '@tensorflow/tfjs';

const preprocessImage = (file) => {
  // Convert image file to tensor, resize, and normalize it as per model's requirements
  const image = tf.browser.fromPixels(file);  // Convert image to tensor
  const resizedImage = tf.image.resizeBilinear(image, [224, 224]);  // Resize image to 224x224 (example)
  const normalizedImage = resizedImage.div(255.0);  // Normalize pixel values to [0, 1]
  
  return normalizedImage.expandDims(0);  // Add a batch dimension
};

export default preprocessImage;
