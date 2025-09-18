/**
 * Partner Management Business Logic for SISO-PUBLIC
 */

import { Partner, PartnerStatus, PartnerTier, Partnership } from '@siso-public/shared-types';
import { ApiClient } from '../api/base';

export class PartnerService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getPartners(filters?: {
    status?: PartnerStatus;
    tier?: PartnerTier;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ partners: Partner[]; meta: any }> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.tier) params.append('tier', filters.tier);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await this.apiClient.get<{ partners: Partner[]; meta: any }>(`/partners?${params}`);
    return response.data;
  }

  async getPartnerById(id: string): Promise<Partner> {
    const response = await this.apiClient.get<Partner>(`/partners/${id}`);
    return response.data;
  }

  async createPartner(partnerData: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partner> {
    const response = await this.apiClient.post<Partner>('/partners', partnerData);
    return response.data;
  }

  async updatePartner(id: string, updates: Partial<Partner>): Promise<Partner> {
    const response = await this.apiClient.patch<Partner>(`/partners/${id}`, updates);
    return response.data;
  }

  async deletePartner(id: string): Promise<void> {
    await this.apiClient.delete(`/partners/${id}`);
  }

  async getPartnerships(partnerId: string): Promise<Partnership[]> {
    const response = await this.apiClient.get<Partnership[]>(`/partners/${partnerId}/partnerships`);
    return response.data;
  }

  async createPartnership(partnerId: string, partnershipData: Omit<Partnership, 'id' | 'partnerId' | 'createdAt' | 'updatedAt'>): Promise<Partnership> {
    const response = await this.apiClient.post<Partnership>(`/partners/${partnerId}/partnerships`, partnershipData);
    return response.data;
  }

  async updatePartnerTier(id: string, tier: PartnerTier): Promise<Partner> {
    const response = await this.apiClient.patch<Partner>(`/partners/${id}/tier`, { tier });
    return response.data;
  }

  async getPartnerCommissions(partnerId: string, timeframe: '7d' | '30d' | '90d' | '1y'): Promise<any> {
    const response = await this.apiClient.get<any>(`/partners/${partnerId}/commissions?timeframe=${timeframe}`);
    return response.data;
  }

  async getPartnerAnalytics(partnerId: string, timeframe: '7d' | '30d' | '90d' | '1y'): Promise<any> {
    const response = await this.apiClient.get<any>(`/partners/${partnerId}/analytics?timeframe=${timeframe}`);
    return response.data;
  }

  async approvePartner(id: string): Promise<Partner> {
    const response = await this.apiClient.post<Partner>(`/partners/${id}/approve`);
    return response.data;
  }

  async rejectPartner(id: string, reason?: string): Promise<Partner> {
    const response = await this.apiClient.post<Partner>(`/partners/${id}/reject`, { reason });
    return response.data;
  }
}