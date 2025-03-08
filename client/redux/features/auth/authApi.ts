import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name: string;
};

type LoginResponse = {
  accessToken: string;
  user: any;
};

type LoginData = {
  email: string;
  password: string;
};

type ActivationResponse = {
  message: string;
};

type ActivationData = {
  activation_token: string;
  activation_code: string;
};

type SocialAuthResponse = LoginResponse;

type SocialAuthData = {
  email: string;
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: `registration`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userRegistration({ token: data.activationToken }));
        } catch (error) {
          console.error('Registration error:', error);
        }
      },
    }),
    activation: builder.mutation<ActivationResponse, ActivationData>({
      query: (data) => ({
        url: "activateuser",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "loginuser",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ accessToken: data.accessToken, user: data.user }));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    socialAuth: builder.mutation<SocialAuthResponse, SocialAuthData>({
      query: (data) => ({
        url: "social-auth",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ accessToken: data.accessToken, user: data.user }));
        } catch (error) {
          console.error('Social auth error:', error);
        }
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "logoutuser",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutMutation } = authApi;
