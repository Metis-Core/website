import { Box, Typography } from '@mui/material';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 3, md: 6 },
        maxWidth: align === 'center' ? 720 : 'none',
        mx: align === 'center' ? 'auto' : 0,
      }}
    >
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            letterSpacing: '0.08em',
            display: 'block',
            mb: 1,
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
          fontWeight: 700,
          color: 'text.primary',
          lineHeight: 1.2,
          mb: description ? 1.5 : 0,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.95rem', md: '1.0625rem' },
            lineHeight: 1.65,
            maxWidth: 640,
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
