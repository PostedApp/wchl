import { Arrayable, OneToFiftyInclusive } from "../../_helpers";
import { Comment, Link, ListingResponse, Sort } from "../../_core";

export type CommentsParams<
  Threaded extends boolean,
  ShowMore extends boolean
> = Partial<Record<"depth" | "limit", number>> & {
  comment?: string;
  context: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  showedits: boolean;
  showmore: ShowMore;
  sort: Sort;
  sr_detail?: boolean;
  threaded: Threaded;
  truncate: OneToFiftyInclusive;
};

export type CommentsResponse<
  isThreaded extends boolean,
  showMore extends boolean
> = [
  ListingResponse<Link, 1>,
  ListingResponse<
    Comment<isThreaded, showMore>,
    isThreaded extends true ? 1 : number
  >
];

export type MoreParams = {
  api_type: "json";
  children: Arrayable<string>;
  id?: string;
  limit_children: boolean;
  link_id: string;
  sort: Sort;
};

export type MoreResponse = {
  json: {
    data: {
      things: Array<Comment<false, false>>;
    };
    errors: string[];
  };
};

export type RandomResponse = [
  ListingResponse<Link, 1>,
  ListingResponse<Comment<true, true>>
];
