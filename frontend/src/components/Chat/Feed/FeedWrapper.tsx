import { Session } from 'next-auth';

interface FeedsWrapperProps {
  session: Session;
}

const FeedsWrapper: React.FC<FeedsWrapperProps> = ({ session }) => {
  return <div>Have a nice days</div>;
};

export default FeedsWrapper;
