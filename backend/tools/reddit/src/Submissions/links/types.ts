import { Arrayable } from "../../_helpers";
import { Link, ListingRequest, ListingResponse } from "../../_core";

type Listed = ListingRequest &
  Partial<Record<"include_categories" | "sr_detail", boolean>> & {
    path?: string;
  };

export type Params = Record<"best" | "new" | "rising", Listed> &
  Record<
    "" | "controversial" | "top",
    Listed & { t?: "all" | "day" | "hour" | "month" | "week" | "year" }
  > & {
    by_id: { names: Arrayable<string> };
    duplicates: ListingRequest &
      Partial<Record<"crossposts_only" | "sr_detail", boolean>> & {
        article: string;
        sort?: "new" | "num_comments";
        sr?: string;
      };
    hot: Listed & {
      g?:
        | "AR"
        | "AU"
        | "BG"
        | "CA"
        | "CL"
        | "CO"
        | "CZ"
        | "FI"
        | "GB"
        | "GLOBAL"
        | "GR"
        | "HR"
        | "HU"
        | "IE"
        | "IN"
        | "IS"
        | "JP"
        | "MX"
        | "MY"
        | "NZ"
        | "PH"
        | "PL"
        | "PR"
        | "PT"
        | "RO"
        | "RS"
        | "SE"
        | "SG"
        | "TH"
        | "TR"
        | "TW"
        | "US"
        | "US_AK"
        | "US_AL"
        | "US_AR"
        | "US_AZ"
        | "US_CA"
        | "US_CO"
        | "US_CT"
        | "US_DC"
        | "US_DE"
        | "US_FL"
        | "US_GA"
        | "US_HI"
        | "US_IA"
        | "US_ID"
        | "US_IL"
        | "US_IN"
        | "US_KS"
        | "US_KY"
        | "US_LA"
        | "US_MA"
        | "US_MD"
        | "US_ME"
        | "US_MI"
        | "US_MN"
        | "US_MO"
        | "US_MS"
        | "US_MT"
        | "US_NC"
        | "US_ND"
        | "US_NE"
        | "US_NH"
        | "US_NJ"
        | "US_NM"
        | "US_NV"
        | "US_NY"
        | "US_OH"
        | "US_OK"
        | "US_OR"
        | "US_PA"
        | "US_RI"
        | "US_SC"
        | "US_SD"
        | "US_TN"
        | "US_TX"
        | "US_UT"
        | "US_VA"
        | "US_VT"
        | "US_WA"
        | "US_WI"
        | "US_WV"
        | "US_WY";
    };
  };

export type Response = Record<
  "" | "best" | "by_id" | "controversial" | "hot" | "new" | "rising" | "top",
  ListingResponse<Link>
> & {
  duplicates: Array<ListingResponse<Link>>;
};
