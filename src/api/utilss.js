import axios from 'axios';

export const fileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Replace with your file upload endpoint
    const uploadUrl = '/upload'; // e.g., '/upload' if you have a backend route or API endpoint

    const response = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the server returns the URL of the uploaded file
    return response.data.fileUrl; // or however the server returns the file URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
