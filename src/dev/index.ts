import React from "react";
import {useInitial} from "./useInitial.js";

const ComponentPreviews = React.lazy(() => import("./previews.js"));

export {
    ComponentPreviews,
    useInitial
};