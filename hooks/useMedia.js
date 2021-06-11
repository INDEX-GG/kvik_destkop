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
   const matchesLaptop = useMediaQuery(theme.breakpoints.between(KvikTheme.breakpoints.values.md, KvikTheme.breakpoints.values.lg));
   const matchesDesktop = useMediaQuery(theme.breakpoints.up(KvikTheme.breakpoints.values.lg));
   const matchesHD = useMediaQuery(theme.breakpoints.up(KvikTheme.breakpoints.values.xl));
   return {
      matchesTablet,
      matchesMobile,
      matchesDesktop,
      matchesLaptop,
      matchesHD,
      isChanged,
      changeHandler,
   };
};