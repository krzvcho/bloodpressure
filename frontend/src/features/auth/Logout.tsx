import { redirect } from 'react-router-dom';
import { queryClient } from '../../providers/queryClientSingletone';

export function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    queryClient.clear();
    return redirect('/');
}