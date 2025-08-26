import { GetResource, popSlash, WithAuth } from "../../_core";
import {
  CommentsParams,
  CommentsResponse,
  MoreParams,
  MoreResponse,
  RandomResponse,
} from "./types";

export async function Get<Threaded extends boolean, ShowMore extends boolean>({
  article,
  subreddit,
  ...params
}: WithAuth<
  CommentsParams<Threaded, ShowMore> & Record<"article" | "subreddit", string>
>): Promise<CommentsResponse<Threaded, ShowMore>> {
  return GetResource<CommentsResponse<Threaded, ShowMore>, typeof params>({
    endpoint: `/r/${subreddit}/comments/${article}`,
    params,
  });
}

export async function GetMore(
  params: WithAuth<MoreParams>
): Promise<MoreResponse> {
  return GetResource<MoreResponse, typeof params>({
    endpoint: `/api/morechildren`,
    params,
  });
}

export async function GetRandom({
  subreddit,
  ...params
}: WithAuth<{ subreddit?: string }>): Promise<RandomResponse> {
  return GetResource<RandomResponse, typeof params>({
    endpoint: subreddit ? `/r/${popSlash(subreddit)}/random` : "/random",
    params,
  });
}
