import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
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
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) {
      return;
    }
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success('Username successfully created!');
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
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
