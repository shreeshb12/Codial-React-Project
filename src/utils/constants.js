const API_ROOT = 'https://codeial.codingninjas.com:8000/api/v2/';

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};

export const LOCALSTORAGE_TOKEN_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmllbmRzaGlwcyI6W10sIl9pZCI6IjY1M2VhMGRlYWNhODEyN2Q1YjU5YTQ4MyIsIm5hbWUiOiJzaHJlZXNoIiwiZW1haWwiOiJzaHJlZXNoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0yOVQxODoxMzo1MC40ODBaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0yOVQxODoxMzo1MC40ODBaIiwiX192IjowLCJpYXQiOjE2OTg2MDQ0ODQsImV4cCI6MTY5ODc3NzI4NH0.R7Jc2Y6c4kyEX3WIRiyH70gDtQ8vt2Ws5-zwTVtDO2A';

//__codeial_token__
