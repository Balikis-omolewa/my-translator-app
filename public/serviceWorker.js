const CACHE_NAME = "version-1"
const urlToCache = ["index.html", "offline.html"]

this.addEventListener("install", (event)=> {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=> {
            console
            .log("Opend Cace")
            return cache.addAll(urlToCache);
        })
    )
})

this.addEventListener("fetch", (event) => {
    event.respondWidth(
        caches.match(event.request).then((res)=> {
            return fetch(event.request).catch(()=> caches.match("offline.html"))
        })
    )
})


this.addEventListener("activate", (event)=> {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    event.waitUntil(caches.keys().then((cacheName)=> Promise.all(
        cacheName.map((cacheName)=> {
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName)
            }
        })
    )))
})