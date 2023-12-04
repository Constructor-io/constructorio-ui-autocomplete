import { useEffect } from 'react';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Section } from '../types';

function useRecommendationsObserver(
  menuIsOpen: boolean,
  sections: Section[],
  constructorIO: Nullable<ConstructorIO>,
  callback: (
    target: HTMLElement,
    sections: Section[],
    constructorIO: Nullable<ConstructorIO>
  ) => void
) {
  // Get refs for each section
  const refs = sections
    .filter((section) => section.type === 'recommendations')
    .map((section) => section.ref);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // For each section, check if it's intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Call the callback, which will be trackRecommendationView in our case
            callback(entry.target as HTMLElement, sections, constructorIO);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    // Observe each section
    refs.forEach((ref) => {
      if (ref?.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Unobserve each section
      refs.forEach((ref) => {
        if (ref?.current) {
          observer.unobserve(ref.current);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuIsOpen]);
}

export default useRecommendationsObserver;
