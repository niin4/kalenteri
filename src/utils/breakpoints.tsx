import React, {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react';

const defaultValue = {}

interface BreakpointProps {
  children: React.ReactNode;
  queries: MediaQuery;
}

export interface MediaQuery {
    sm: string;
    md: string;
    lg: string;
    or: string;
    [key: string]: string;
}

export interface MediaQueryBreakpoints {
    sm: boolean;
    md: boolean;
    lg: boolean;
    or: boolean;
}

const BreakpointContext = createContext<any>(defaultValue);

// https://betterprogramming.pub/how-to-use-media-queries-programmatically-in-react-4d6562c3bc97
const BreakpointProvider: React.FC<BreakpointProps> = ({ children, queries }) => {
  const [queryMatch, setQueryMatch] = useState({});

  useEffect(() => {
      const mediaQueryLists: any = {};
      const keys = Object.keys(queries);
      let isAttached = false;

      const handleQueryListener = () => {
          const updatedMatches = keys.reduce((acc: any, media: string) => {
              acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
              return acc;
          }, {})
          setQueryMatch(updatedMatches)
      }

      if (window && window.matchMedia) {
          const matches: any = {};
          keys.forEach(media => {
              if (typeof queries[media] === 'string') {
                  mediaQueryLists[media] = window.matchMedia(queries[media]);
                  matches[media] = mediaQueryLists[media].matches
              } else {
                  matches[media] = false
              }
          });
          setQueryMatch(matches);
          isAttached = true;
          keys.forEach(media => {
              if (typeof queries[media] === 'string') {
                  mediaQueryLists[media].addListener(handleQueryListener)
              }
          });
      }

      return () => {
          if (isAttached) {
              keys.forEach(media => {
                  if (typeof queries[media] === 'string') {
                      mediaQueryLists[media].removeListener(handleQueryListener)
                  }
              });
          }
      }
  }, [queries]);

  return (
      <BreakpointContext.Provider value={queryMatch} >
          { children}
      </BreakpointContext.Provider>
  )

}

function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
      throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
}
export { useBreakpoint, BreakpointProvider };