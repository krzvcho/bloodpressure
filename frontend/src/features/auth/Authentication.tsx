import { redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import type { ActionFunctionArgs } from 'react-router-dom';

function AuthenticationPage(): JSX.Element {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if (mode !== 'login' && mode !== 'signup') {
    throw new Error('Unsupported mode!');
  }
  const data = await request.formData();
  const authData = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  };

  const response = await fetch('http://localhost:8080/' + (mode === 'login' ? 'login' : 'signup'), {
    method: 'POST',
    body: JSON.stringify(authData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Error('Could not authenticate user.');
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  localStorage.setItem('user_name', resData.user.email);
  localStorage.setItem('user_id', resData.user.id);
  return redirect('/');
}