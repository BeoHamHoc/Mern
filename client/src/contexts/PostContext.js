import { children, createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
  apiUrl,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });
  //PostModal
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  const [showToast, setShowToast] = useState({
    post: null,
    show: false,
    message: "",
    type: null,
  });
  // get all post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };
  // add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //find post when user click update post
  const findPost = postId => {
    const post = postState.posts.find(post => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };
  //update post
  const updatePost = async updatedPost => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        console.log(response.data)
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };
  // delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
