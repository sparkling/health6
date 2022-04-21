import { NewsitemStoryblok } from "./component-types-sb";

export type story = {
  name: string;
  created_at: Date;
  published_at: Date;
  alternates: string[];
  id: number;
  uuid: number;
  content: NewsitemStoryblok;
  slug: string;
  full_slug: string;
  default_full_slug: string;
  sort_by_date: boolean;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number;
  meta_data: string;
  group_id: string;
  first_published_at: Date;
  release_id: string;
  lang: string;
  path: string;
  translated_slugs: string[];
}


