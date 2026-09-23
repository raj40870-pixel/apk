import { getAuthToken } from './auth';

export const fetchBuildHistory = async () => {
  const token = getAuthToken();
  if (!token) return [];
  const res = await fetch('/api/builds', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  if (json.success) return json.builds;
  return [];
};

export const deleteBuildsAPI = async (ids: string[]) => {
  const token = getAuthToken();
  if (!token) return false;
  const res = await fetch('/api/builds', {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ ids })
  });
  const json = await res.json();
  return json.success;
};
