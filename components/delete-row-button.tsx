'use client';

import { useTransition } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

export default function DeleteRowButton({
  onDelete,
  confirmMessage = 'Delete this item? This cannot be undone.',
  size = 'small',
}: {
  onDelete: () => Promise<void>;
  confirmMessage?: string;
  size?: 'small' | 'medium';
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Tooltip title="Delete">
      <span>
        <IconButton
          size={size}
          disabled={pending}
          onClick={() => {
            if (!window.confirm(confirmMessage)) return;
            startTransition(() => {
              void onDelete();
            });
          }}
          sx={{ color: '#c62828' }}
        >
          <DeleteOutline fontSize={size} />
        </IconButton>
      </span>
    </Tooltip>
  );
}
