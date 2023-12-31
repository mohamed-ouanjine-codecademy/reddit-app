import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const options = {
  name: "homePosts",
  initialState: {
    homePosts: [],
    homePostsPending: false,
    homePostsRejected: false,
  },
  reducers: {
    incrementUpScore: (state, action) => {
      const index = action.payload;
      state.homePosts[index].data.score++;
    },
    decrementUpScore: (state, action) => {
      const index = action.payload;
      state.homePosts[index].data.score--;
    },
    decrementDownScore: (state, action) => {
      const index = action.payload;
      state.homePosts[index].data.score--;
    },
    incrementDownScore: (state, action) => {
      const index = action.payload;
      state.homePosts[index].data.score++;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getHomePosts.pending, (state) => {
        state.homePostsPending = true;
        state.homePostsRejected = false;
      })
      .addCase(getHomePosts.fulfilled, (state, action) => {
        state.homePostsPending = false;
        state.homePostsRejected = false;

        const homePostsResults = action.payload.data.children;
        state.homePosts = homePostsResults;
      })
      .addCase(getHomePosts.rejected, (state) => {
        state.homePostsPending = false;
        state.homePostsRejected = true;
      })
  }
};

const homePostsSlice = createSlice(options);

// reducers

export const getHomePosts = createAsyncThunk(
  'homePosts/getHomePosts',
  async ({endPoint}) => {
    try {
      const response = await fetch(`https://www.reddit.com${endPoint}`);

      if (response.ok) {
        const json = await response.json();
        return json;
      }
    } catch (error) {

    }
  }
);

// selectors

  // homePosts
export const selectHomePosts = state => state.homePosts.homePosts;
export const selectHomePostsPending = state => state.homePosts.homePostsPending;
export const selectHomePostsRejected = state => state.homePosts.homePostsRejected;

// exports
export const { incrementUpScore, decrementUpScore, incrementDownScore, decrementDownScore } = homePostsSlice.actions;
export default homePostsSlice.reducer;