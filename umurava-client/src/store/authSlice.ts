import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService, User, SignupData, LoginData } from "@/services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async Thunks
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      console.log("🔄 Redux: Dispatching signup action");
      const response = await authService.signup(userData);
      console.log("✅ Redux: Signup action completed successfully");
      return response;
    } catch (error: any) {
      console.error("❌ Redux: Signup action failed:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: LoginData, { rejectWithValue }) => {
    try {
      console.log("🔄 Redux: Dispatching login action");
      const response = await authService.login(userData);
      console.log("✅ Redux: Login action completed successfully");
      return response;
    } catch (error: any) {
      console.error("❌ Redux: Login action failed:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initialize auth state from localStorage
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const token = authService.getToken();
    const user = authService.getUser();
    return { token, user };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize auth
      .addCase(initializeAuth.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        if (token && user) {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        }
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;