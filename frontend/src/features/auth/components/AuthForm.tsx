// import { useState } from 'react';

import { Form, Link, useSearchParams, useActionData, useNavigation } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function AuthForm(): JSX.Element {
  const data = useActionData() as { errors?: Record<string, string>; message?: string } | undefined;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Form method="post" style={{ width: '100%', maxWidth: 400 }}>
        <Stack spacing={3}>
          <Typography variant="h5" component="h1" align="center">
            {isLogin ? 'Log in' : 'Create a new user'}
          </Typography>
          {data && data.errors && (
            <Stack spacing={1}>
              {Object.values(data.errors).map((err) => (
                <Alert severity="error" key={err}>{err}</Alert>
              ))}
            </Stack>
          )}
          {data && data.message && <Alert severity="error">{data.message}</Alert>}
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            autoComplete="email"
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            required
            fullWidth
            autoComplete={isLogin ? "current-password" : "new-password"}
            margin="normal"
          />
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Button
              component={Link as any}
              to={`?mode=${isLogin ? 'signup' : 'login'}`}
              variant="text"
              disabled={isSubmitting}
            >
              {isLogin ? 'Create new user' : 'Login'}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Box>
  );
}

export default AuthForm;
