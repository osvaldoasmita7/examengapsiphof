export interface iProvider {
  id?: number;
  name: string;
  bussinessName: string;
  address: string;
}

export interface ProviderResponse {
  name: string;
  bussinessName: string;
  address: string;
}
export interface ProviderVersionResponse {
  version: string;
}
export interface StatusProviderResponse {
  ok: boolean;
  message: string;
  status?: number;
}
