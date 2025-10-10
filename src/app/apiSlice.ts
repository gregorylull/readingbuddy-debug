import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@/configs/config';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.baseApiUrl}`,
    }),
    endpoints: () => ({}),
});

// mutations
export const {} = api;
