import multer, { StorageEngine, Multer } from "multer";

const storage: StorageEngine = multer.memoryStorage();
const imageUpload: Multer = multer({ storage: storage });

export default imageUpload;
