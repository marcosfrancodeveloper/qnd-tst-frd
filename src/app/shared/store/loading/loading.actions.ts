import { createAction } from "@ngrx/store";

export const startLoading = createAction('[Loading] Show');
export const stopLoading = createAction('[Loading] Hide');
