import React from 'react';
import { LayoutProps } from '.';

export function LoggedIn(props: LayoutProps) {
  const { children } = props;
  return <main className=''>{children}</main>;
}
