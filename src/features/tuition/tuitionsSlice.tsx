import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    error: any;   // You can type this better if the error structure is known
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
  posts: { status: "", data: [], error: {}, message: "" },
  batches: [],
  uploadPost: [],
  isLoading: false,
  isError: false,
  success: false,
};

// AsyncThunk for fetching tuition posts
export const fetchTutionPost = createAsyncThunk(
  "fetch/tuition/post",
  async () => {
    const response = await publicGet("/teacher/tuition/post");
    return response.data; // Adjust this based on the actual structure of the response
  }
);

// AsyncThunk for fetching tuition batches
export const fetchTutionBatch = createAsyncThunk(
  "fetch/tuition/batch",
  async () => {
    const response = await publicGet("/batch/all/batches");
    return response.data; // Adjust this based on the actual structure of the response
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
      return response.data; // Adjust this based on the actual structure of the response
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>; // Define type for error response
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data.message); // Access typed error message
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutionPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTutionPost.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.posts = { status: "success", data: [], error: {}, message: "No data found" };
        } else {
          state.posts = { status: "success", data: action.payload, error: {}, message: "Posts fetched successfully" };
        }
        state.isLoading = false;
      })
      .addCase(fetchTutionPost.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = { status: "", data: [], error: {}, message: action.payload as string || "An error occurred" };
        state.isError = true;
      })
      .addCase(fetchTutionBatch.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTutionBatch.fulfilled, (state, action) => {
        state.batches = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTutionBatch.rejected, (state) => {
        state.isLoading = false;
        state.batches = [];
        state.isError = true;
      })
      .addCase(createTutionPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTutionPost.fulfilled, (state, action) => {
        state.uploadPost = action.payload;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createTutionPost.rejected, (state, action) => {
        state.isLoading = false;
        state.uploadPost = [];
        state.isError = true;
        state.posts.error = action.payload as string || "An error occurred";
      });
  },
});

// Export the actions and reducer
export const { updatePostClean } = tuitionPostSlice.actions;
export default tuitionPostSlice.reducer;
