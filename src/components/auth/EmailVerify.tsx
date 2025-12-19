import EmailVerifySuccess from './EmailVerifySuccess';
import EmailVerifyFailed from './EmailVerifyFailed';
import { useSearchParams } from 'react-router';

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  if (status === 'success') {
    return <EmailVerifySuccess />;
  }

  if (status === 'failed') {
    return <EmailVerifyFailed />;
  }

  return (
    <div className="text-center mt-10 text-gray-500">
      Invalid verification link
    </div>
  );
};

export default EmailVerify;
