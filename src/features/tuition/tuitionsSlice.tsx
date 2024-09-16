import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { privatePost, publicGet } from "../../services/apiCaller";

// Define types for the post data, batches, and errors
interface Post {
  id: number;
  title: string;
  description: string;
  // Add any other fields that are part of your post data
}

interface ErrorResponse {
  message: string; // Adjust based on the actual structure of your API error
}

// Define the state structure for the slice
interface TuitionPostState {
  posts: {
    status: string;
    data: Post[]; // Array of Post objects
    error: string | null; // Error should be string or null
    message: string;
  };
  batches: any[];  // Replace `any[]` with actual batch structure if known
  uploadPost: any[];  // Replace `any[]` with actual post structure if known
  isLoading: boolean;
  isError: boolean;
  success: boolean;
}

// Initial state for the slice
const initialState: TuitionPostState = {
  posts: { status: "", data: [], error: null, message: "" },
  batches: [],
  uploadPost: [],
  isLoading: false,
  isError: false,
  success: false,
};

// AsyncThunk for fetching tuition posts with filters
export const fetchTutionPost = createAsyncThunk(
  'tuitions/fetchTutionPost',
  async (filters: { teacherName: string; versityName: string; city: string }, thunkAPI) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await publicGet(`/teacher/tuition/post?${queryString}`);
      return response.data; // Return data for the fulfilled case
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
);

// AsyncThunk for fetching tuition batches
export const fetchTutionBatch = createAsyncThunk(
  "fetch/tuition/batch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicGet("/batch/all/batches");
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// AsyncThunk for creating a tuition post
export const createTutionPost = createAsyncThunk(
  "upload/tuition/post",
  async (
    { token, data }: { token: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await privatePost("/teacher/tuition/post", token, data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Tuition post slice
export const tuitionPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostClean: (state) => {
      state.success = false;
      state.uploadPost = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tuition posts with filters
      .addCase(fetchTutionPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.posts.error = null;
      })
      .addCase(fetchTutionPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.posts = {
          status: "success",
          data: action.payload,
          error: null,
          message: action.payload.length > 0 ? "Posts fetched successfully" : "No data found",
        };
      })
      .addCase(fetchTutionPost.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.posts = {
          status: "failed",
          data: [],
          error: action.payload || "An error occurred",
          message: "Failed to fetch posts",
        };
      })

      // Fetch tuition batches
      .addCase(fetchTutionBatch.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTutionBatch.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.batches = action.payload;
      })
      .addCase(fetchTutionBatch.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.batches = [];
        state.posts.error = action.payload || "Failed to fetch batches";
      })

      // Create tuition post
      .addCase(createTutionPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTutionPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.uploadPost = action.payload;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createTutionPost.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.uploadPost = [];
        state.posts.error = action.payload || "Failed to create post";
      });
  },
});

// Export the actions and reducer
export const { updatePostClean } = tuitionPostSlice.actions;
export default tuitionPostSlice.reducer;
