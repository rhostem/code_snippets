import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

export const withReactRouter = (Story: React.FC) => (
  <Router>
    <Story />
  </Router>
);

export const withRecoilRoot = (Story: React.FC) => (
  <RecoilRoot>
    <Story />
  </RecoilRoot>
);

const queryClient = new QueryClient();

export const withQueryClient = (Story: React.FC) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);
