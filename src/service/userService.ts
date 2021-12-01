import userRepository from "../repository/userRepository";

const apiCall = async () => fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .catch(() => {});

const fetchUserOnline = async () => {
  try {
    const resultApi = await apiCall();
    const allResults = resultApi.results;

    return allResults[0];
  } catch {
    return { };
  }
}

const fetchUserOffline = () => userRepository.getUser();

const saveUserOffline = (name: string) => userRepository.saveUser(name);

const userService = {
  fetchUserOnline,
  fetchUserOffline,
  saveUserOffline
}

export default userService;