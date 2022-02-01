export async function cachedFetch({ url, ttlInSeconds }: { url: string; ttlInSeconds: number; }): Promise<Response> {
    const CACHE_HEADER = 'rutherford-cache-expires';
    if (!('caches' in window)) {
        return window.fetch(url);
    }

    let now = new Date();
    caches.open('rutherford').then(
        cache => cache.match(url).then(
            response => {
                if (response) {
                    let expires = Number(response.headers.get(CACHE_HEADER))
                    if (expires > now.getTime() / 1000) {
                        return new Promise<Response>(resolve => {
                            resolve(response);
                        });
                    }
                }
                window.fetch(url).then(
                    liveResponse => {
                        let expires = (now.getTime() / 1000) + ttlInSeconds;
                        const newHeaders = new Headers(liveResponse.headers)
                        newHeaders.set(CACHE_HEADER, expires.toString(10));
                        const newResponse = new Response(liveResponse.body, {
                            headers: newHeaders
                        })
                        cache.put(url, newResponse);
                        return new Promise<Response>(resolve => {
                            resolve(liveResponse);
                        });
                    }
                )
            }
        )
    )
}