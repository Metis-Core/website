'use client';

import { FC, useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Search, Close } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import useClickOutside from '@/components/motion-primitives/useClickOutside';

const transition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.3,
};

const NavbarSearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>;

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log('Search:', searchValue);
      setSearchValue('');
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <MotionConfig transition={transition}>
      <Box ref={containerRef} sx={{ display: { xs: 'none', sm: 'block' }, mx: 2 }}>
        <motion.div
          animate={{
            width: isOpen ? '240px' : '36px',
          }}
          initial={false}
          style={{
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid rgba(115, 115, 115, 0.2)',
            backgroundColor: 'rgba(115, 115, 115, 0.05)',
            padding: '2px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {!isOpen ? (
              <IconButton
                onClick={() => setIsOpen(true)}
                size="small"
                sx={{
                  width: '32px',
                  height: '32px',
                  color: '#737373',
                  '&:hover': {
                    backgroundColor: 'rgba(115, 115, 115, 0.1)',
                  },
                }}
              >
                <Search sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            ) : (
              <>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <TextField
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages..."
                    variant="standard"
                    size="small"
                    sx={{
                      width: '100%',
                      '& .MuiInput-root': {
                        color: '#000',
                        fontSize: '0.85rem',
                        '&::before': {
                          borderBottom: 'none',
                        },
                        '&:hover::before': {
                          borderBottom: 'none',
                        },
                        '&.Mui-focused::after': {
                          borderBottom: 'none',
                        },
                      },
                      '& .MuiInput-input::placeholder': {
                        color: '#999',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
                <IconButton
                  onClick={() => setIsOpen(false)}
                  size="small"
                  sx={{
                    width: '32px',
                    height: '32px',
                    color: '#737373',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  <Close sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </>
            )}
          </Box>
        </motion.div>
      </Box>
    </MotionConfig>
  );
};

export default NavbarSearchButton;
