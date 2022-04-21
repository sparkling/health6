export interface NewsitemStoryblok {
  Title?: string;
  Subheading: string;
  Summary: string;
  HeroImage?: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  };
  Body: any;
  Links?:
    | {
        cached_url?: string;
        linktype?: string;
        [k: string]: any;
      }
    | {
        id?: string;
        cached_url?: string;
        linktype?: "story";
        [k: string]: any;
      }
    | {
        url?: string;
        cached_url?: string;
        linktype?: "asset" | "url";
        [k: string]: any;
      }
    | {
        email?: string;
        linktype?: "email";
        [k: string]: any;
      };
  _uid: string;
  component: "Newsitem";
  [k: string]: any;
}
