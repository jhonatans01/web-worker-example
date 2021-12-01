const KEY = 'name-test';

const getUser = () => sessionStorage.getItem(KEY);
const saveUser = (name: string) => sessionStorage.setItem(KEY, name);

const userRepository = {
  getUser,
  saveUser
};

export default userRepository;