// Save the user data to localStorage
export const saveUserData = (user) => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(user); // Add new user data to the array
    localStorage.setItem("users", JSON.stringify(existingUsers));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

// Get all users from localStorage
export const getUsersData = () => {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    console.error("Error fetching data from localStorage:", error);
    return [];
  }
};

// Get a user from localStorage based on their email or username
export const getUserByEmailOrUsername = (emailOrUsername) => {
  const users = getUsersData();
  return users.find(
    (user) =>
      user.mobile === emailOrUsername || user.username === emailOrUsername
  );
};

// Update the user data in localStorage
export const updateUserData = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error updating data in localStorage:", error);
  }
};
