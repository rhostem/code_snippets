import { rest } from 'msw';

export const getErrorHandler = ({
  method = 'get',
  uri = '',
  status = 400,
  body = ['serevr error message'],
  once = true,
}: {
  method?: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  status?: number;
  body?: any;
  once?: boolean;
}) => {
  return rest[method](uri, (req, res) => {
    const cb = (response: any) => {
      response.status = status;
      response.body = body;
      return response;
    };
    return once ? res.once(cb) : res(cb);
  });
};
