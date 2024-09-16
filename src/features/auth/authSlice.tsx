import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privatePutFile, publicPost } from "../../services/apiCaller";

// Define types for responses and payloads
interface User {
  token?: string;
  // Add other user properties as needed
}

interface ErrorResponse {
  message: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  error: boolean;
  errorMessage: string;
  updatedStudent: boolean;
  updatedTeacher: boolean;
  token: string;
}

// Handle User Login
export const createUserLogin = createAsyncThunk<User, any, { rejectValue: string }>(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/student/login", data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message || "An unknown error occurred");
    }
  }
);

// Handle Tutor Login
export const createTutorLogin = createAsyncThunk<User, any, { rejectValue: string }>(
  "tutor/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/teacher/login", data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message || "An unknown error occurred");
    }
  }
);

// Handle Tutor Profile Update
export const updateTutorProfile = createAsyncThunk<User, { token: string; data: any }, { rejectValue: string }>(
  "teacher/updateTeacherProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePutFile("/teacher/update/profile", token, data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message || "An unknown error occurred");
    }
  }
);

// Handle Student Profile Update
export const updateStudentProfile = createAsyncThunk<User, { token: string; data: any }, { rejectValue: string }>(
  "auth/updateStudentProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePutFile("/auth/student/update/profile", token, data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data.message || "An unknown error occurred");
    }
  }
);

// Create Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {} as User,
    error: false,
    errorMessage: "",
    updatedStudent: false,
    updatedTeacher: false,
    token: "",
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token || "";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = {} as User;
      state.error = false;
      state.errorMessage = "";
      state.token = "";
    },
    errorClean: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.updatedStudent = false;
      state.updatedTeacher = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createUserLogin.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token || "";
    });
    builder.addCase(createUserLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload || "An unknown error occurred";
    });
    builder.addCase(createTutorLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createTutorLogin.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token || "";
    });
    builder.addCase(createTutorLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload || "An unknown error occurred";
    });
    builder.addCase(updateTutorProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateTutorProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.updatedTeacher = true;
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(updateTutorProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload || "An unknown error occurred";
    });
    builder.addCase(updateStudentProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateStudentProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.updatedStudent = true;
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(updateStudentProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload || "An unknown error occurred";
    });
  },
});

export const { login, logout, errorClean } = authSlice.actions;
export default authSlice.reducer;
