import { classificationAPI } from '../classification';
import { classificationClient } from '../client';

jest.mock('../client');

describe('Classification API', () => {
  it('fetches customer tier', async () => {
    const mockResponse = { data: { current_tier: 'PREMIUM' } };
    classificationClient.get.mockResolvedValue(mockResponse);

    const result = await classificationAPI.getCustomerTier('cust_001');
    expect(result.data.current_tier).toBe('PREMIUM');
  });
});