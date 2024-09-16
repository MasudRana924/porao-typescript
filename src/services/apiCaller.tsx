import axios, { AxiosResponse } from 'axios';
import { api } from './index';

// Define types for headers and request bodies
interface Config {
  headers: {
    'Content-Type': string;
    token?: string;
  };
}

interface FileConfig {
  headers: {
    'Content-Type': string;
    token?: string;
  };
}

const config: Config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const fileConfig: FileConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// Function parameter and return type definitions
export const publicGet = async (endpoint: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

export const publicGetSingle = async (endpoint: string, id: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(`${api}${endpoint}/${id}`, config);
  return response.data;
};

export const publicPost = async (endpoint: string, body: any): Promise<any> => {
  const response: AxiosResponse<any> = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

export const privateGet = async (endpoint: string, token: string): Promise<any> => {
  const privateConfig: Config = {
    ...config,
    headers: {
      ...config.headers,
      token: token, // Fix: add token separately, not to 'Content-Type'
    },
  };
  const response: AxiosResponse<any> = await axios.get(`${api}${endpoint}`, privateConfig);
  return response.data;
};

export const privatePost = async (endpoint: string, token: string, body: any): Promise<any> => {
  const privateConfig: Config = {
    ...config,
    headers: {
      ...config.headers,
      token: token,
    },
  };
  const response: AxiosResponse<any> = await axios.post(`${api}${endpoint}`, body, privateConfig);
  return response.data;
};

export const privatePutFile = async (endpoint: string, token: string, body: FormData): Promise<any> => {
  const privateFileConfig: FileConfig = {
    ...fileConfig,
    headers: {
      ...fileConfig.headers,
      token: token,
    },
  };
  const response: AxiosResponse<any> = await axios.put(`${api}${endpoint}`, body, privateFileConfig);
  return response.data;
};

export const privatePut = async (endpoint: string, token: string, body: any): Promise<any> => {
  const privateConfig: Config = {
    ...config,
    headers: {
      ...config.headers,
      token: token,
    },
  };
  const response: AxiosResponse<any> = await axios.put(`${api}${endpoint}`, body, privateConfig);
  return response.data;
};

export const privatePatch = async (endpoint: string, token: string, body: any): Promise<any> => {
  const privateConfig: Config = {
    ...config,
    headers: {
      ...config.headers,
      token: token,
    },
  };
  const response: AxiosResponse<any> = await axios.patch(`${api}${endpoint}`, body, privateConfig);
  return response.data;
};

export const publicPatch = async (endpoint: string, body: any): Promise<any> => {
  const response: AxiosResponse<any> = await axios.patch(`${api}${endpoint}`, body, config);
  return response.data;
};
