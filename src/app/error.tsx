"use client";
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};
const Error = ({}: Props) => {
  return <div>Error</div>;
};

export default Error;
