export const checkImage = (file) => {
  let error = "";
  if (!file) error = "File does not exist";

  if (file.size > 1024 * 1024) error = "The largest image size is 1Mb";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    error = "Image format is incorrect";

  return error;
};
