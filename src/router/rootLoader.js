import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing/index.js";
import {setLocation} from "../states/modules/app/index.js";

export const rootLoader = async ({request, params}, requiredAuth, saga = null, permissions = []) => {
    const url = new URL(request.url);

    store.dispatch(
        setLocation({
            pathName: url.pathname,
            prevPathName: store.getState().app.location.pathName,
            params,
        }),
    );

    if (saga) {
        store.dispatch(initialSaga(saga));
    }

    return null;
};
