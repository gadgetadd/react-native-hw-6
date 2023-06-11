export const selectUserId = state => state.auth.user.userId;

export const selectUserName = state => state.auth.user.name;

export const selectUserMail = state => state.auth.user.email;

export const selectIsLoading = state => state.auth.isLoading;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectError = state => state.auth.error;

