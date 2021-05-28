import createAsyncSlice from './helper/createAsyncSlice';
import consts from '../consts'

const movies = createAsyncSlice({
  name: 'movies',
  initialState: {
    list: [],
    pages: 0,
    infinite: true,
  },
  reducers: {
    addMovies(state, action) {
      state.list.push(...action.payload);
      state.pages++;
      if (action.payload.length === 0) state.infinite = false;
    },
    removeMovies(state) {
      state.pages = 0;
      state.infinite = true;
      state.list = [];
      state.data = null;
    },
  },
  fetchConfig: (page = 1) => ({
    url: `${consts.API_URL}/upcoming?api_key=${consts.API_KEY}&language=en-US&page=${page}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  }),
});

export const { addMovies, removeMovies } = movies.actions;
export const fetchMovies = movies.asyncAction;

export const loadNewMovies = (page = 1) => async (dispatch) => {
  const { payload } = await dispatch(fetchMovies(page));
  dispatch(addMovies(payload.results));
};

export default movies.reducer;
