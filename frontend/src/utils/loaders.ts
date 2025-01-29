import { Params, redirect } from 'react-router-dom';
import { getRequest } from './routes';

export async function tournamentDetailLoader({
  params,
}: {
  params: Params<'tournamentId'>;
}) {
  try {
    const response = await getRequest(
      `/api/v1/tournament/${params.tournamentId}`
    );

    if (response.status === 401) {
      return redirect('/login');
    }

    const data = await response.json();
    return data.data;
  } catch (e) {
    throw new Error(`Something went wrong: ${e}`);
  }
}
