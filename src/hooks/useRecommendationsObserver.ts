import { useEffect } from 'react';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Section } from '../types';
import { isRecommendationsSection } from '../typeGuards';

/**
 * Custom hook that observes the visibility of recommendation sections and calls trackRecommendationView event.
 * This is done by using the IntersectionObserver API to observe the visibility of each recommendation section.
 * That is done by passing the ref of each recommendation section to the IntersectionObserver.
 * The refs are either passed as a prop in `SectionConfiguration` or created by the library by default.
 * Either way the refs are stored in the sections array.
 *
 * @param menuIsOpen - A boolean indicating whether the menu is open.
 * @param sections - An array of sections to observe.
 * @param constructorIO - An instance of the ConstructorIO client.
 * @param trackRecommendationView - A callback function to track the recommendation view event.
 */
function useRecommendationsObserver(
  menuIsOpen: boolean,
  sections: Section[],
  constructorIO: Nullable<ConstructorIO>,
  trackRecommendationView: (
    target: HTMLElement,
    sections: Section[],
    constructorIO: Nullable<ConstructorIO>
  ) => void
) {
  // Get refs for each section
  const refs = sections
    .filter((section) => isRecommendationsSection(section))
    .map((section) => section.ref);

  useEffect(() => {
    const intersectionObserverOptions = {
      // Root element is the bounding target for the observer to observe. If null, then the document viewport is used.
      root: null,
      // 0.1 indicate the callback should be called when that proportion of the target is visible (e.g., 10% visible).
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      // For each section, check if it's intersecting
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackRecommendationView(entry.target as HTMLElement, sections, constructorIO);
        }
      });
    }, intersectionObserverOptions);

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
