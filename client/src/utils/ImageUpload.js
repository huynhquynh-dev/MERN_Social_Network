export const checkImage = (file) => {
  let error = "";
  if (!file) error = "File does not exist";

  if (file.size > 1024 * 1024) error = "The largest image size is 1Mb";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    error = "Image format is incorrect";

  return error;
};

export const imageUpload = async (images) => {
  let imgArr = [];

  for(const image of images){
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rqrdohxd");
    formData.append("cloud_name", "lionhuynh");

    const res = await fetch("https://api.cloudinary.com/v1_1/lionhuynh/image/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    imgArr.push({public_id: data.public_id, url: data.secure_url})
  }
  return imgArr;
}
