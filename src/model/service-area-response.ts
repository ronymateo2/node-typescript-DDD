import { ServiceArea } from "../domain/service-area/data";
import { QueryResponse } from "../core/query-response";

export interface ServiceAreaResponse extends QueryResponse {
  location?: ServiceArea;
}
