import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';

export const useMedia = () => {
   const theme = useTheme();
   const [isChanged, setChanged] = useState(false);
   const changeHandler = () => setChanged((o) => !o);

   const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const matchesTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
   const matchesNotebook = useMediaQuery(theme.breakpoints.between('md', 'lg'));
   const matchesDesktop = useMediaQuery(theme.breakpoints.up('lg'));
   const matchesHD = useMediaQuery(theme.breakpoints.up('xl'));

   return {
      matchesTablet,
      matchesMobile,
      matchesDesktop,
      matchesNotebook,
      matchesHD,
      isChanged,
      changeHandler,
   };
};