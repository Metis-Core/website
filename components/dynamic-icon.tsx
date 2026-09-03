import type { SvgIconProps } from '@mui/material';
import Storage from '@mui/icons-material/Storage';
import AnalyticsOutlined from '@mui/icons-material/AnalyticsOutlined';
import Analytics from '@mui/icons-material/Analytics';
import Autorenew from '@mui/icons-material/Autorenew';
import SecurityOutlined from '@mui/icons-material/SecurityOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import SignalCellularAltOutlined from '@mui/icons-material/SignalCellularAltOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import Extension from '@mui/icons-material/Extension';
import CloudOutlined from '@mui/icons-material/CloudOutlined';
import Insights from '@mui/icons-material/Insights';

const REGISTRY = {
  Storage,
  AnalyticsOutlined,
  Analytics,
  Autorenew,
  SecurityOutlined,
  ShareOutlined,
  PublicOutlined,
  SignalCellularAltOutlined,
  TrendingUpOutlined,
  AccessTimeOutlined,
  Extension,
  CloudOutlined,
  Insights,
} as const satisfies Record<string, React.ComponentType<SvgIconProps>>;

export type IconName = keyof typeof REGISTRY;

export function DynamicIcon({ name, ...props }: Omit<SvgIconProps, 'name'> & { name?: string | null }) {
  const Cmp = (name && (REGISTRY as Record<string, React.ComponentType<SvgIconProps>>)[name]) || Extension;
  return <Cmp {...props} />;
}

export const ICON_OPTIONS: IconName[] = Object.keys(REGISTRY) as IconName[];
