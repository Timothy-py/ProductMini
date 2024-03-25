import sharp from "sharp";

const resize = async (buffer:Buffer) => {
  const data = await sharp(buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();
  return data;
};

export default resize;
