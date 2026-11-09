import { LoaderFunction, redirectDocument } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirectDocument('./en/', 308);
};
