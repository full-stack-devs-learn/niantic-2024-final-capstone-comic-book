import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import userService from '../../services/user-profile-service';
import { UserProfile } from '../../models/UserProfile'; // Import the updated UserProfile model
import { RootState } from '../store';

interface UserProfileState {
  profile: UserProfile | null;
  profiles: UserProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  profiles: [],
  status: 'idle',
  error: null,
};

// Thunk for fetching the current user's profile
export const getCurrentUserProfile = createAsyncThunk<UserProfile | null, void, { rejectValue: string }>(
  'userProfile/fetchCurrentProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.fetchCurrentProfile();
      return response;
    } catch (err) {
      return rejectWithValue('Failed to fetch current profile.');
    }
  }
);

// Thunk for fetching a user profile by ID
export const getUserProfileById = createAsyncThunk<UserProfile | null, number, { rejectValue: string }>(
  'userProfile/fetchUserProfileById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.fetchUserProfileById(userId);
      return response;
    } catch (err) {
      return rejectWithValue('Failed to fetch user profile by ID.');
    }
  }
);

// Thunk for creating a new user profile
export const addUserProfile = createAsyncThunk<UserProfile | null, UserProfile, { rejectValue: string }>(
  'userProfile/createUserProfile',
  async (newProfile, { rejectWithValue }) => {
    try {
      const response = await userService.createUserProfile(newProfile);
      return response;
    } catch (err) {
      return rejectWithValue('Failed to create user profile.');
    }
  }
);

// Thunk for updating an existing user profile
export const modifyUserProfile = createAsyncThunk<UserProfile | null, { updatedProfile: UserProfile }, { rejectValue: string }>(
  'userProfile/updateUserProfile',
  async ({ updatedProfile }, { rejectWithValue }) => {
    try {
      const response = await userService.updateCurrentUserProfile(updatedProfile);
      return response;
    } catch (err) {
      return rejectWithValue('Failed to update user profile.');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUserProfile.fulfilled, (state, action: PayloadAction<UserProfile | null>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(getCurrentUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch current profile.';
      })
      .addCase(getUserProfileById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProfileById.fulfilled, (state, action: PayloadAction<UserProfile | null>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(getUserProfileById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch user profile by ID.';
      })
      .addCase(addUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addUserProfile.fulfilled, (state, action: PayloadAction<UserProfile | null>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.profiles.push(action.payload);
        }
      })
      .addCase(addUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to create user profile.';
      })
      .addCase(modifyUserProfile.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(modifyUserProfile.fulfilled, (state, action: PayloadAction<UserProfile | null>) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.profile = action.payload; 
        }
      })
      .addCase(modifyUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed'; 
        state.error = action.payload ?? 'Failed to update user profile.';
      });
  },
});


export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectAllProfiles = (state: RootState) => state.userProfile.profiles;

export default userProfileSlice.reducer;
