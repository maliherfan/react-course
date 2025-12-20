import { useCallback, useEffect,useReducer } from 'react';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_DATA':
      return { ...state, loading: false, data: action.payload };
    case 'ADD_ITEM':
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        loading: false,
        data: state.data.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updatedData }
            : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        loading: false,
        data: state.data.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function useFetch(initialUrl) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetcher = useCallback(
    async ({ url = initialUrl, method = 'GET', body = null }) => {
      dispatch({ type: 'SET_LOADING' });

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : null,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'خطا در API');
        }

        const json = await res.json();

        switch (method.toUpperCase()) {
          case 'GET': {
            dispatch({ type: 'SET_DATA', payload: json });
            break;
          }

          case 'POST': {
            dispatch({ type: 'ADD_ITEM', payload: json });
            break;
          }

          case 'PUT': {
            dispatch({
              type: 'EDIT_ITEM',
              payload: {
                id: body.id,
                updatedData: json,
              },
            });
            break;
          }

          case 'DELETE': {
            const idFromUrl = url.split('/').pop();
            dispatch({ type: 'DELETE_ITEM', payload: idFromUrl });
            break;
          }

          default:
            dispatch({ type: 'SET_DATA', payload: json });
        }

        return json;
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        throw err;
      }
    },
    [initialUrl]
  );

  useEffect(() => {
    if (initialUrl) {fetcher({ method: 'GET' });}
  }, []);

  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.error]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    fetcher,
  };
}

export default useFetch;
