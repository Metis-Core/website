'use client';

import { useState } from 'react';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { CheckCircle, Close, InsertDriveFileOutlined } from '@mui/icons-material';
import { UploadButton } from '@/lib/uploadthing';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export interface FileUploadProps {
  name: string;
  endpoint: keyof OurFileRouter;
  label?: string;
  helper?: string;
  hint?: string;
  defaultUrl?: string | null;
  defaultLabel?: string | null;
  required?: boolean;
}

export default function FileUpload({
  name,
  endpoint,
  label,
  helper,
  hint,
  defaultUrl,
  defaultLabel,
  required,
}: FileUploadProps) {
  const [url, setUrl] = useState<string | null>(defaultUrl ?? null);
  const [filename, setFilename] = useState<string | null>(defaultLabel ?? null);
  const [error, setError] = useState<string | null>(null);

  return (
    <Box>
      {label && (
        <Typography variant="body2" sx={{ color: '#111', mb: 0.5, fontWeight: 600 }}>
          {label} {required && <Box component="span" sx={{ color: '#dc004e' }}>*</Box>}
        </Typography>
      )}
      {helper && (
        <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
          {helper}
        </Typography>
      )}
      <input type="hidden" name={name} value={url ?? ''} />

      {url ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '12px',
            border: '1px solid #cfe8d4',
            bgcolor: '#f3faf5',
          }}
        >
          <CheckCircle sx={{ color: '#2e7d32' }} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {filename ?? 'File uploaded'}
            </Typography>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              style={{ fontSize: '0.75rem', color: '#666' }}
            >
              View file
            </a>
          </Box>
          <IconButton
            size="small"
            aria-label="Remove file"
            onClick={() => {
              setUrl(null);
              setFilename(null);
              setError(null);
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            border: '1.5px dashed rgba(0,0,0,0.2)',
            borderRadius: '12px',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: '#fafafa',
            transition: 'all 0.2s ease',
            '&:hover': { borderColor: 'rgba(0,0,0,0.35)', bgcolor: '#f5f5f5' },
            '.ut-button': {
              bgcolor: '#000',
              color: '#fff',
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: '#333' },
            },
            '.ut-label': { color: '#666', fontSize: '0.8rem' },
            '.ut-allowed-content': { color: '#999', fontSize: '0.75rem' },
          }}
        >
          <InsertDriveFileOutlined sx={{ color: '#666', fontSize: 32 }} />
          <UploadButton
            endpoint={endpoint}
            appearance={{ button: 'ut-button', allowedContent: 'ut-allowed-content' }}
            onClientUploadComplete={(res) => {
              const uploaded = res?.[0];
              if (!uploaded) return;
              setUrl(uploaded.serverData?.url ?? uploaded.ufsUrl);
              setFilename(uploaded.name);
              setError(null);
            }}
            onUploadError={(err) => setError(err.message)}
          />
          {hint && (
            <Chip label={hint} size="small" variant="outlined" sx={{ mt: 0.5 }} />
          )}
        </Box>
      )}

      {error && (
        <Typography variant="caption" sx={{ color: '#c62828', mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
