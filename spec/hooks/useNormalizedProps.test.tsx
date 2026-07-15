import { renderHook } from '@testing-library/react';
import useNormalizedProps from '../../src/hooks/useNormalizedProps';
import { UserDefinedSection } from '../../src/types';

describe('useNormalizedProps', () => {
  it('defaults indexSectionName for a recommendations section that only has a legacy identifier', () => {
    const sections: UserDefinedSection[] = [
      { type: 'recommendations', identifier: 'bestsellers' } as UserDefinedSection,
    ];

    const { result } = renderHook(() => useNormalizedProps({ sections }));

    const [normalized] = result.current.sections as any[];
    // Both the podId (derived from identifier) and the indexSectionName default must be applied.
    expect(normalized.podId).toBe('bestsellers');
    expect(normalized.indexSectionName).toBe('Products');
  });

  it('preserves an explicit indexSectionName and podId on a recommendations section', () => {
    const sections: UserDefinedSection[] = [
      { type: 'recommendations', podId: 'bestsellers', indexSectionName: 'Search Suggestions' },
    ];

    const { result } = renderHook(() => useNormalizedProps({ sections }));

    const [normalized] = result.current.sections as any[];
    expect(normalized.podId).toBe('bestsellers');
    expect(normalized.indexSectionName).toBe('Search Suggestions');
  });
});
