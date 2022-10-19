import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "29316725-1ab556a3c68a6bc4eeec3eacb";

export const getImages = async values => {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${values}&page=1&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}