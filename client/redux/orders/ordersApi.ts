import { apiSlice } from "../features/api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "get-all-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getRazorpayKey: builder.query({
      query: () => ({
        url: "razorpay-key",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createRazorpayOrder: builder.mutation({
      query: (amount) => ({
        url: "create-razorpay-order",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "verify-payment",
        method: "POST",
        body: paymentData,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetRazorpayKeyQuery,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} = ordersApi;