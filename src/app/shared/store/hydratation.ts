import {
  ActionReducer,
  MetaReducer,
  INIT,
  UPDATE,
} from "@ngrx/store";
import { IAppState } from "./app.state";
import { StorageService } from "src/app/shared/services/storage.service";

const localService = new StorageService();
const key = "HYDRATATION_LOCAL_STATE";

/**
 * Invoca esta função para criar um meta-reducer que
 * salva o estado criptografado da aplicação no localStorage
 * @param reducer Reductor padrão do store
 * @returns Reductor modificado
 */
export const hydrationMetaReducer = (
  reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localService.get<IAppState>(key) ?? {};
      if (storageValue) {
        try {
          return storageValue;
        } catch {
          localService.remove(key);
        }
      }
    }
    const nextState = reducer(state, action);
    localService.set(key, nextState);
    return nextState;
  };
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
