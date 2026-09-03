'use client';

import { useState } from 'react';
import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';
import { EditNoteOutlined, UploadFileOutlined } from '@mui/icons-material';
import FileUpload from '@/components/file-upload';

const MIN_CHARS = 120;
const MAX_CHARS = 4000;

export interface CoverLetterInputProps {
  textName: string;
  fileName: string;
  defaultText?: string;
  defaultFileUrl?: string | null;
  defaultFileLabel?: string | null;
}

export default function CoverLetterInput({
  textName,
  fileName,
  defaultText,
  defaultFileUrl,
  defaultFileLabel,
}: CoverLetterInputProps) {
  const [tab, setTab] = useState<'write' | 'upload'>(defaultFileUrl ? 'upload' : 'write');
  const [text, setText] = useState(defaultText ?? '');

  const length = text.length;
  const belowMin = length > 0 && length < MIN_CHARS;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 1, gap: 1, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111' }}>
            Cover letter
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Write in the editor, or upload a PDF / Word doc — whichever you prefer.
          </Typography>
        </Box>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          minHeight: 40,
          mb: 1.5,
          bgcolor: '#f5f5f5',
          borderRadius: '10px',
          p: 0.5,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTab-root': {
            minHeight: 36,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            color: '#666',
            '&.Mui-selected': { bgcolor: '#fff', color: '#000', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' },
          },
        }}
      >
        <Tab icon={<EditNoteOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label="Write" value="write" />
        <Tab icon={<UploadFileOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label="Upload file" value="upload" />
      </Tabs>

      {tab === 'write' ? (
        <Box>
          {/* Only submit the text field when the Write tab is active. */}
          <textarea
            name={textName}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder="Tell us why this role and Metis, what you'd ship in the first 90 days, and anything else we should know."
            rows={10}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1.5px solid #e5e7eb',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#111',
              resize: 'vertical',
              minHeight: 180,
              background: '#fff',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#111';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.06)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <input type="hidden" name={fileName} value="" />
          <Box sx={{ mt: 0.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              <Chip label="Optional" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
              {belowMin && (
                <Chip
                  label={`${MIN_CHARS - length} more characters recommended`}
                  size="small"
                  sx={{ height: 20, fontSize: '0.7rem', bgcolor: '#fff7ed', color: '#c2410c' }}
                />
              )}
            </Box>
            <Typography variant="caption" sx={{ color: length >= MAX_CHARS ? '#dc004e' : '#666', fontWeight: 500 }}>
              {length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <FileUpload
            name={fileName}
            endpoint="coverLetterUploader"
            hint="PDF or Word · max 8 MB"
            defaultUrl={defaultFileUrl}
            defaultLabel={defaultFileLabel}
          />
          <input type="hidden" name={textName} value="" />
        </Box>
      )}
    </Box>
  );
}
