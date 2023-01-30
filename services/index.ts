import { instance as nonGuardInstance } from "./instance"
import { ResponseAPI, IItems } from "./types"

export const getListGithub = (param: string) => {
  return nonGuardInstance.get<ResponseAPI>(`/search/users${param}`)
}