import { SectionConfiguration } from './types';
export type GetIndexOffset = (args: {
  activeSections: SectionConfiguration[];
  sectionIdentifier: string;
}) => number;
export declare const getIndexOffset: GetIndexOffset;
type CamelToStartCase = (camelCaseString: string) => string;
export declare const camelToStartCase: CamelToStartCase;
export declare function isTrackingRequestSent(trackingRequestUrl: any): any;
export declare function clearConstructorRequests(): void;
export declare function sleep(ms: any): Promise<unknown>;
export declare const getStoryParams: (
  storyCode: any,
  templateCode: any,
  importCode: any
) => {
  docs: {
    source: {
      code: string;
      language: string;
      format: boolean;
      type: string;
    };
  };
};
export declare const stringify: (obj: any) => string;
export declare const disableStoryActions: (story: any) => void;
export {};
