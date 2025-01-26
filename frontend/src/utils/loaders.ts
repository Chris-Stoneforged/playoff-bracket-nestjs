import { Params } from 'react-router-dom';
import { getRequest } from './routes';

export async function tournamentDetailLoader({
  params,
}: {
  params: Params<'tournamentId'>;
}) {
  const response = await getRequest(
    `/api/v1/tournament/${params.tournamentId}`
  );
  const data = await response.json();
  console.log(data.data);
  return data.data;
}
