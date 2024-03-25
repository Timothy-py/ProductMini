import { v4 as uuidv4 } from "uuid";
const randomImageNameGenerator = () => {
  return uuidv4();
};

export default randomImageNameGenerator;
