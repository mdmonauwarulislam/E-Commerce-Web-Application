const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  
    const cloudName = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("Cloudinary Response:", data);
  
      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }
  
      return data;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error.message);
      return null;
    }
  };
  
  export default uploadImage;
  