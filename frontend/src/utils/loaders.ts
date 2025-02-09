import { Params, redirect } from 'react-router-dom';
import { getRequest } from './routes';

export async function tournamentDetailLoader({
  params,
}: {
  params: Params<'tournamentId'>;
}) {
  const response = await getRequest(
    `/api/v1/tournament/${params.tournamentId}`
  );

  if (response.status === 401) {
    return redirect('/login');
  }
  if (response.status !== 200) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const data = await response.json();
  return data.data;
}

export async function bracketLoader({ params }: { params: Params<'userId'> }) {
  return null;
}
