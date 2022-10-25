import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { Center, Stack, Text, Button, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import UserOperations from '../../graphql/ops/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) {
      return;
    }
    try {
      await createUsername({ variables: { username } });
    } catch (error) {
      console.error('onSubmit error', error);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl"> Create a username </Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Button onClick={onSubmit} width="100%">
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">Msgr</Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image
                  height="20px"
                  src="/images/google.png"
                  alt="google logo"
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
