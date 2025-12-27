import classes from './PageContent.module.css';


import type { ReactNode, FC } from 'react';

interface PageContentProps {
  title: string;
  children: ReactNode;
}

const PageContent: FC<PageContentProps> = ({ title, children }) => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
