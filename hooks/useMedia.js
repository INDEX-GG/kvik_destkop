import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import KvikTheme from '../UI/theme';

export const useMedia = () => {
   const theme = useTheme();
   const [isChanged, setChanged] = useState(false);
   const changeHandler = () => setChanged((o) => !o);
   
   
   const matchesMobile = useMediaQuery(theme.breakpoints.down(KvikTheme.breakpoints.values.sm));
   const matchesTablet = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.sm, KvikTheme.breakpoints.values.md));
   const matchesCustom350 = useMediaQuery(theme.breakpoints.down(KvikTheme.breakpoints.values.custom350));
   const matchesCustom1024 = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.md, KvikTheme.breakpoints.values.custom1024));
   const matchesCustom1080 = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.custom1024, KvikTheme.breakpoints.values.custom1080));
   const matchesCustom1100 = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.md, KvikTheme.breakpoints.values.custom1100));
   const matchesCustom1365 = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.custom1365));
   const matchesLaptop = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.md, KvikTheme.breakpoints.values.lg));
   const matchesDesktop = useMediaQuery(theme.breakpoints.up(KvikTheme.breakpoints.values.lg));
   const matchesHD = useMediaQuery(theme.breakpoints.up(KvikTheme.breakpoints.values.xl));
   return {
      matchesTablet,
      matchesMobile,
      matchesDesktop,
      matchesLaptop,
      matchesCustom350,
      matchesCustom1024,
      matchesCustom1080,
      matchesCustom1100,
      matchesCustom1365,
      matchesHD,
      isChanged,
      changeHandler,
   };
};