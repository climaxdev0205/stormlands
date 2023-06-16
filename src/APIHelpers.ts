import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

export interface SubscriptionValue<T> {
  value: { data: T };
}

export async function callGraphQL<T>(query: any, variables?: any): Promise<GraphQLResult<T>> {
  return API.graphql(graphqlOperation(query, variables)) as GraphQLResult<T>;
}

export function subscribeGraphQL<T>(subscription: any, callback: (value: T) => void) {
  //@ts-ignore
  return API.graphql(graphqlOperation(subscription)).subscribe({
    next: (response: SubscriptionValue<T>) => {
      callback(response.value.data);
    },
  });
}
