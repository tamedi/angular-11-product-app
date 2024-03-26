export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState:DataStateEnum,
  data?:T, // le ? : pour dire que sa présence dans l'objet n'est pas obligatoire
  errorMessage?:string
}
