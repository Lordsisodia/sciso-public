/**
 * Client Management Business Logic for SISO-PUBLIC
 */

import { Client, ClientStatus, ClientProject } from '@siso-public/shared-types';
import { ApiClient } from '../api/base';

export class ClientService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getClients(filters?: {
    status?: ClientStatus;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ clients: Client[]; meta: any }> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await this.apiClient.get<{ clients: Client[]; meta: any }>(`/clients?${params}`);
    return response.data;
  }

  async getClientById(id: string): Promise<Client> {
    const response = await this.apiClient.get<Client>(`/clients/${id}`);
    return response.data;
  }

  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const response = await this.apiClient.post<Client>('/clients', clientData);
    return response.data;
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const response = await this.apiClient.patch<Client>(`/clients/${id}`, updates);
    return response.data;
  }

  async deleteClient(id: string): Promise<void> {
    await this.apiClient.delete(`/clients/${id}`);
  }

  async getClientProjects(clientId: string): Promise<ClientProject[]> {
    const response = await this.apiClient.get<ClientProject[]>(`/clients/${clientId}/projects`);
    return response.data;
  }

  async createClientProject(clientId: string, projectData: Omit<ClientProject, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>): Promise<ClientProject> {
    const response = await this.apiClient.post<ClientProject>(`/clients/${clientId}/projects`, projectData);
    return response.data;
  }

  async updateClientStatus(id: string, status: ClientStatus): Promise<Client> {
    const response = await this.apiClient.patch<Client>(`/clients/${id}/status`, { status });
    return response.data;
  }

  async getClientAnalytics(clientId: string, timeframe: '7d' | '30d' | '90d' | '1y'): Promise<any> {
    const response = await this.apiClient.get<any>(`/clients/${clientId}/analytics?timeframe=${timeframe}`);
    return response.data;
  }
}