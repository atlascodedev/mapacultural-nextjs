import axios from "axios";

const getAddressFromZip = async (zipcode: string) => {
  const zipCodeClean = zipcode.replace(/[^0-9]/g, "");

  try {
    return await (
      await axios.get(`https://viacep.com.br/ws/${zipCodeClean}/json`)
    ).data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getAddressFromZip;
