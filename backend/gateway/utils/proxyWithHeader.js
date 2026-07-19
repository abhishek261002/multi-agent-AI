import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            // 1. Ensure headers object exists defensively
            proxyReqOpts.headers = proxyReqOpts.headers || {};

            if (srcReq.user) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }

            // CRITICAL FIX: Explicitly return the modified options object
            return proxyReqOpts;
        }
    });
};