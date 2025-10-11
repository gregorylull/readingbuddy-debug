import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@/configs/config';
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';

interface Image {
    id: string,
    url: string
}

interface ImagesResponse {
    urls: Image[]
}

const imageAdapter = createEntityAdapter<Image>()
const initialState = imageAdapter.getInitialState()

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.baseUrl}`,
    }),
    endpoints: (build) => ({
        getImages: build.query<EntityState<Image, string>, void>({
            query: () => `images/latest`,
            transformResponse: (response: ImagesResponse) => {
                return imageAdapter.setAll(
                    initialState,
                    response.urls
                )
            },
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                const eventSource = new EventSource(`${config.imageUrl}/sse`, {
                    withCredentials: false
                })

                try {
                    await cacheDataLoaded
                    
                    console.log("sse start:")

                    eventSource.onmessage = function (ev) {
                        console.log(`sse typeless data: ${JSON.parse(ev.data)}`)
                    }

                    const latestHandler = (event) => {
                        const latestImageUrls = JSON.parse(event.data).urls;
                        console.log("sse received:", latestImageUrls)
                        updateCachedData((draft) => {
                            imageAdapter.upsertMany(draft, latestImageUrls)
                        })
                    }

                    eventSource.addEventListener('latest', latestHandler);


                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }

                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved

                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                eventSource.close();
            },
        }),
    }),
});

// mutations
export const { useGetImagesQuery } = api;

const selectImagesResult = api.endpoints.getImages.select();
const selectImagesData = createSelector(
    selectImagesResult,
    (result) => result.data ?? initialState
);

export const {selectAll: selectAllImages } = imageAdapter.getSelectors(selectImagesData)



