interface RegisterResponse {
  user: {
    id: string;
    email: string;
    username?: string;
  };
}
let API_URL = "https://192.168.0.27:8000/api/users";
class ApiService {
  async register(email: string, password: string, username?: string) {
    try {
      console.log("Registering user with email:", email, "username:", username);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
