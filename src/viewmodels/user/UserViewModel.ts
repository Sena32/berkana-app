import { UserService } from '@/services/user.service';

export class UserViewModel {
  private static instance: UserViewModel;

  private constructor() {}

  public static getInstance(): UserViewModel {
    if (!UserViewModel.instance) {
      UserViewModel.instance = new UserViewModel();
    }
    return UserViewModel.instance;
  }

  async listUsers(page: number = 1): Promise<any> {
    try {
      const { data } = await UserService.listUsers(page);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao listar usuários');
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const { data } = await UserService.getUserById(id);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar usuário');
    }
  }

  async createUser(userData: any): Promise<any> {
    try {
      const { data } = await UserService.createUser(userData);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar usuário');
    }
  }

  async editUser(id: string, userData: any): Promise<any> {
    try {
      const { data } = await UserService.editUser(id, userData);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao editar usuário');
    }
  }

  async uploadAvatar(id: string, file: File): Promise<any> {
    try {
      const { data } = await UserService.uploadAvatar(id, file);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer upload do avatar');
    }
  }

  async adminGeneratePassword(id: string): Promise<any> {
    try {
      const { data } = await UserService.adminGeneratePassword(id);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao gerar senha');
    }
  }

  async firstAccessPassword(data: any): Promise<any> {
    try {
      const { data: resp } = await UserService.firstAccessPassword(data);
      return resp;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao alterar senha');
    }
  }
} 