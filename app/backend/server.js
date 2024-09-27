import React, { useState } from 'react';

const OutputPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setResult(data.result);  // Display the prediction result
    } catch (error) {
      console.error('Error during prediction:', error);
      alert('Prediction failed.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Image Prediction</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handlePredict} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {result && (
        <div>
          <h2>Prediction Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default OutputPage;