'use client';

import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { IconButton, Paper, Card } from '@mui/material';

type IconButtonProps = Omit<ComponentProps<typeof IconButton>, 'href'> & { href: string };
export function LinkIconButton({ href, ...props }: IconButtonProps) {
  // Cast avoids MUI's polymorphic `component` overload complaints.
  const Comp = IconButton as unknown as React.ComponentType<{ component: unknown; href: string } & Record<string, unknown>>;
  return <Comp component={NextLink} href={href} {...props} />;
}

type PaperProps = Omit<ComponentProps<typeof Paper>, 'href'> & { href: string };
export function LinkPaper({ href, ...props }: PaperProps) {
  const Comp = Paper as unknown as React.ComponentType<{ component: unknown; href: string } & Record<string, unknown>>;
  return <Comp component={NextLink} href={href} {...props} />;
}

type CardProps = Omit<ComponentProps<typeof Card>, 'href'> & { href: string };
export function LinkCard({ href, ...props }: CardProps) {
  const Comp = Card as unknown as React.ComponentType<{ component: unknown; href: string } & Record<string, unknown>>;
  return <Comp component={NextLink} href={href} {...props} />;
}
