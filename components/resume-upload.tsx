'use client';

import { useState } from 'react';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { AttachFileOutlined, CheckCircle, Close, InsertDriveFileOutlined } from '@mui/icons-material';
import { UploadButton } from '@/lib/uploadthing';

export interface ResumeUploadProps {
  name: string;
  defaultUrl?: string | null;
  defaultLabel?: string | null;
}

export default function ResumeUpload({ name, defaultUrl, defaultLabel }: ResumeUploadProps) {
  const [url, setUrl] = useState<string | null>(defaultUrl ?? null);
  const [label, setLabel] = useState<string | null>(defaultLabel ?? null);
  const [error, setError] = useState<string | null>(null);

  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
        Resume (PDF or Word, max 8&nbsp;MB)
      </Typography>
      <input type="hidden" name={name} value={url ?? ''} />

      {url ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '10px',
            border: '1px solid #cfe8d4',
            bgcolor: '#f3faf5',
          }}
        >
          <CheckCircle sx={{ color: '#2e7d32' }} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {label ?? 'Resume uploaded'}
            </Typography>
            <a href={url} target="_blank" rel="noreferrer noopener" style={{ fontSize: '0.75rem', color: '#666' }}>
              View file
            </a>
          </Box>
          <IconButton
            size="small"
            aria-label="Remove resume"
            onClick={() => { setUrl(null); setLabel(null); setError(null); }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            border: '1px dashed rgba(0,0,0,0.25)',
            borderRadius: '10px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            '.ut-button': {
              bgcolor: '#000',
              color: '#fff',
              fontWeight: 600,
              px: 2,
              py: 1,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: '#333' },
            },
            '.ut-label': { color: '#666', fontSize: '0.8rem' },
            '.ut-allowed-content': { color: '#999', fontSize: '0.75rem' },
          }}
        >
          <InsertDriveFileOutlined sx={{ color: '#666' }} />
          <UploadButton
            endpoint="resumeUploader"
            appearance={{ button: 'ut-button', label: 'ut-label', allowedContent: 'ut-allowed-content' }}
            onClientUploadComplete={(res) => {
              const uploaded = res?.[0];
              if (!uploaded) return;
              setUrl(uploaded.serverData?.url ?? uploaded.ufsUrl);
              setLabel(uploaded.name);
              setError(null);
            }}
            onUploadError={(err) => setError(err.message)}
          />
          <Chip
            icon={<AttachFileOutlined />}
            label="Optional but recommended"
            size="small"
            variant="outlined"
            sx={{ mt: 0.5 }}
          />
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
