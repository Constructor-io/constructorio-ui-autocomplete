import {
  cnstrcDataAttrs,
  getItemCnstrcDataAttributes,
  getRecommendationsSectionCnstrcDataAttributes,
  getConversionButtonCnstrcDataAttributes,
  normalizeSeedItems,
} from '../../src/utils/dataAttributeHelpers';
import { Item, RecommendationsSection, AutocompleteSection } from '../../src/types';

describe('dataAttributeHelpers', () => {
  describe('normalizeSeedItems', () => {
    it('returns undefined when itemIds is undefined', () => {
      expect(normalizeSeedItems(undefined)).toBeUndefined();
    });

    it('returns array as-is when itemIds is already an array', () => {
      const items = ['item1', 'item2', 'item3'];
      expect(normalizeSeedItems(items)).toEqual(items);
    });

    it('converts single string to array', () => {
      expect(normalizeSeedItems('item1')).toEqual(['item1']);
    });
  });

  describe('getItemCnstrcDataAttributes', () => {
    it('adds basic attributes for all items', () => {
      const item = {
        section: 'Products',
        value: 'Test Product',
        data: { id: 'prod-123' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.itemSection]).toBe('Products');
      expect(attrs[cnstrcDataAttrs.common.itemName]).toBe('Test Product');
    });

    it('adds item-id for Products', () => {
      const item = {
        section: 'Products',
        value: 'Test Product',
        data: { id: 'prod-123' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.itemId]).toBe('prod-123');
    });

    it('does NOT add item-id for Search Suggestions', () => {
      const item = {
        section: 'Search Suggestions',
        value: 'test query',
        data: { id: 'some-id' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.itemId]).toBeUndefined();
    });

    it('adds variation-id when present', () => {
      const item = {
        section: 'Products',
        value: 'Test Product',
        data: { id: 'prod-123', variation_id: 'var-456' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.variationId]).toBe('var-456');
    });

    it('does NOT add variation-id when not present', () => {
      const item = {
        section: 'Products',
        value: 'Test Product',
        data: { id: 'prod-123' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.variationId]).toBeUndefined();
    });

    it('adds group-id for in-group suggestions', () => {
      const item = {
        section: 'Search Suggestions',
        value: 'test query',
        groupId: 'group-123',
        groupName: 'Test Group',
        data: {},
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.itemGroup]).toBe('group-123');
    });

    it('adds recommendation attributes when podId and strategy exist', () => {
      const item = {
        section: 'Products',
        value: 'Recommended Product',
        data: { id: 'prod-123' },
        podId: 'bestsellers',
        strategy: { id: 'strategy-456' },
      } as unknown as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.recommendations.item]).toBe('recommendation');
      expect(attrs[cnstrcDataAttrs.recommendations.strategyId]).toBe('strategy-456');
    });

    it('does NOT add strategy-id when strategy has no id', () => {
      const item = {
        section: 'Products',
        value: 'Recommended Product',
        data: { id: 'prod-123' },
        podId: 'bestsellers',
        strategy: {},
      } as unknown as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.recommendations.item]).toBe('recommendation');
      expect(attrs[cnstrcDataAttrs.recommendations.strategyId]).toBeUndefined();
    });

    it('adds sponsored listing campaign ID when present', () => {
      const item = {
        section: 'Products',
        value: 'Sponsored Product',
        data: { id: 'prod-123' },
        labels: { sl_campaign_id: 12345 },
      } as unknown as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.slCampaignId]).toBe('12345');
    });

    it('adds sponsored listing campaign owner when present', () => {
      const item = {
        section: 'Products',
        value: 'Sponsored Product',
        data: { id: 'prod-123' },
        labels: { sl_campaign_owner: 'Brand XYZ' },
      } as unknown as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.slCampaignOwner]).toBe('Brand XYZ');
    });

    it('handles items with no optional attributes', () => {
      const item = {
        section: 'Products',
        value: 'Simple Product',
        data: { id: 'prod-123' },
      } as Item;

      const attrs = getItemCnstrcDataAttributes(item);

      expect(attrs[cnstrcDataAttrs.common.itemSection]).toBe('Products');
      expect(attrs[cnstrcDataAttrs.common.itemName]).toBe('Simple Product');
      expect(attrs[cnstrcDataAttrs.common.itemId]).toBe('prod-123');
      expect(attrs[cnstrcDataAttrs.common.variationId]).toBeUndefined();
      expect(attrs[cnstrcDataAttrs.common.itemGroup]).toBeUndefined();
      expect(attrs[cnstrcDataAttrs.recommendations.item]).toBeUndefined();
    });
  });

  describe('getRecommendationsSectionCnstrcDataAttributes', () => {
    it('returns basic recommendation attributes', () => {
      const section = {
        type: 'recommendations',
        podId: 'bestsellers',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section);

      expect(attrs[cnstrcDataAttrs.recommendations.recommendationsContainer]).toBe(true);
      expect(attrs[cnstrcDataAttrs.recommendations.recommendationsPodId]).toBe('bestsellers');
    });

    it('returns empty object for non-recommendation sections', () => {
      const section = {
        type: 'autocomplete',
        indexSectionName: 'Products',
        data: [],
      } as AutocompleteSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section);

      expect(attrs).toEqual({});
    });

    it('adds result-id when provided', () => {
      const section = {
        type: 'recommendations',
        podId: 'bestsellers',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section, 'result-123');

      expect(attrs[cnstrcDataAttrs.common.resultId]).toBe('result-123');
    });

    it('adds num-results when provided', () => {
      const section = {
        type: 'recommendations',
        podId: 'bestsellers',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section, undefined, 5);

      expect(attrs[cnstrcDataAttrs.common.numResults]).toBe(5);
    });

    it('adds num-results even when zero', () => {
      const section = {
        type: 'recommendations',
        podId: 'bestsellers',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section, undefined, 0);

      expect(attrs[cnstrcDataAttrs.common.numResults]).toBe(0);
    });

    it('adds seed-items when provided as array', () => {
      const section = {
        type: 'recommendations',
        podId: 'similar',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(
        section,
        undefined,
        undefined,
        ['item1', 'item2', 'item3']
      );

      expect(attrs[cnstrcDataAttrs.recommendations.seedItems]).toBe('item1,item2,item3');
    });

    it('does NOT add seed-items when array is empty', () => {
      const section = {
        type: 'recommendations',
        podId: 'similar',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(section, undefined, undefined, []);

      expect(attrs[cnstrcDataAttrs.recommendations.seedItems]).toBeUndefined();
    });

    it('adds all attributes when all parameters provided', () => {
      const section = {
        type: 'recommendations',
        podId: 'bestsellers',
        data: [],
      } as RecommendationsSection;

      const attrs = getRecommendationsSectionCnstrcDataAttributes(
        section,
        'result-123',
        10,
        ['seed1', 'seed2']
      );

      expect(attrs[cnstrcDataAttrs.recommendations.recommendationsContainer]).toBe(true);
      expect(attrs[cnstrcDataAttrs.recommendations.recommendationsPodId]).toBe('bestsellers');
      expect(attrs[cnstrcDataAttrs.common.resultId]).toBe('result-123');
      expect(attrs[cnstrcDataAttrs.common.numResults]).toBe(10);
      expect(attrs[cnstrcDataAttrs.recommendations.seedItems]).toBe('seed1,seed2');
    });
  });

  describe('getConversionButtonCnstrcDataAttributes', () => {
    it('returns correct attribute for add_to_cart', () => {
      const attrs = getConversionButtonCnstrcDataAttributes('add_to_cart');

      expect(attrs[cnstrcDataAttrs.common.conversionBtn]).toBe('add_to_cart');
    });

    it('returns correct attribute for add_to_wishlist', () => {
      const attrs = getConversionButtonCnstrcDataAttributes('add_to_wishlist');

      expect(attrs[cnstrcDataAttrs.common.conversionBtn]).toBe('add_to_wishlist');
    });

    it('returns correct attribute for custom conversion type', () => {
      const attrs = getConversionButtonCnstrcDataAttributes('custom_action');

      expect(attrs[cnstrcDataAttrs.common.conversionBtn]).toBe('custom_action');
    });
  });
});
