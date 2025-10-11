const isLocalhost = location.host.includes("localhost")

let origin = isLocalhost ? __SERVER__ : __NETWORK__; 


export const config = {
    baseServerUrl: __SERVER__,
    baseNetworkUrl: __NETWORK__,
    baseUrl: `${origin}`,
    baseApiUrl: `${origin}/api`,
    imageUrl:`${origin}/images`
};
