import { FC } from 'react';
import { Container } from '@mui/material';
import { ChildrenProps } from '../../@types/generics';

const PageContainer: FC<ChildrenProps> = ({ children }) => {
  return (
    <Container
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
