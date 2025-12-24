import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy users database (in a real app, this would be on the server)
const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "👤",
    role: "user",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "👩",
    role: "user",
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    avatar: "👨‍💼",
    role: "admin",
    createdAt: "2024-01-03T00:00:00.000Z"
  }
];

// Generate a dummy JWT token
const generateDummyToken = (userId) => {
  return `dummy-jwt-token-${userId}-${Date.now()}`;
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Async thunks for dummy authentication
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await delay(1000);

      const { email, password } = credentials;

      // Find user in dummy database
      const user = DUMMY_USERS.find(u => u.email === email && u.password === password);

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      // Generate dummy token
      const token = generateDummyToken(user.id);

      // Store token
      localStorage.setItem("token", token);

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await delay(1500);

      const { name, email, password } = userData;

      // Check if user already exists
      const existingUser = DUMMY_USERS.find(u => u.email === email);
      if (existingUser) {
        return rejectWithValue("User with this email already exists");
      }

      // Validate password strength
      if (password.length < 6) {
        return rejectWithValue("Password must be at least 6 characters long");
      }

      // Create new user
      const newUser = {
        id: DUMMY_USERS.length + 1,
        name,
        email,
        password, // In real app, this would be hashed
        avatar: "👤",
        role: "user",
        createdAt: new Date().toISOString()
      };

      // Add to dummy database (in real app, this would be saved to server)
      DUMMY_USERS.push(newUser);

      // Generate token
      const token = generateDummyToken(newUser.id);
      localStorage.setItem("token", token);

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await delay(500);

      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      // Extract user ID from dummy token
      const userId = token.split('-')[3]; // dummy-jwt-token-{userId}-{timestamp}

      // Find user in dummy database
      const user = DUMMY_USERS.find(u => u.id === parseInt(userId));

      if (!user) {
        localStorage.removeItem("token");
        return rejectWithValue("User not found");
      }

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await delay(800);

      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      // Extract user ID from dummy token
      const userId = token.split('-')[3];

      // Find and update user in dummy database
      const userIndex = DUMMY_USERS.findIndex(u => u.id === parseInt(userId));

      if (userIndex === -1) {
        return rejectWithValue("User not found");
      }

      // Update user data
      DUMMY_USERS[userIndex] = { ...DUMMY_USERS[userIndex], ...userData };

      // Return updated user data (without password)
      const { password: _, ...userWithoutPassword } = DUMMY_USERS[userIndex];
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue("Update failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await delay(600);

      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      const { currentPassword, newPassword } = passwords;

      // Extract user ID from dummy token
      const userId = token.split('-')[3];
      const user = DUMMY_USERS.find(u => u.id === parseInt(userId));

      if (!user) {
        return rejectWithValue("User not found");
      }

      // Verify current password
      if (user.password !== currentPassword) {
        return rejectWithValue("Current password is incorrect");
      }

      // Validate new password
      if (newPassword.length < 6) {
        return rejectWithValue("New password must be at least 6 characters long");
      }

      // Update password
      user.password = newPassword;

      return { message: "Password changed successfully" };
    } catch (error) {
      return rejectWithValue("Password change failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: !!localStorage.getItem("token")
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.success = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.success = true;
        state.token = localStorage.getItem("token");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.success = true;
        state.token = localStorage.getItem("token");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loginSuccess, logout, clearError, clearSuccess, setToken } = authSlice.actions;
export default authSlice.reducer;
