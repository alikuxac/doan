import axios from 'axios';

export const fetchData = async (path: string, token?: string) => {
  return axios.get('', { headers: { 'Authorization': "" } })
};

export const postData = async (path: string) => {};