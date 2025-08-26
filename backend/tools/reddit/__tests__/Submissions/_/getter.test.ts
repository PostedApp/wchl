import { Get } from '../../../src/Submissions/_';
import { accessToken } from '../../_';

const id = ['t1_dpq4fc3', 't3_92dd8', 't5_36buk'];

describe('.List', () => returnsListResponses());

function returnsListResponses() {
  test(`info`, async () => {
    const response = await Get({ ...accessToken, route: 'info', id });
    expect(response).toBeDefined();
  });

  test.skip(`saved_categories`, async () => {
    // gives 403 Forbidden error even with proper auth scopes;
    const response = await Get({ ...accessToken, route: 'saved_categories' });
    console.log(response);
    expect(response).toBeDefined();
  });
}
