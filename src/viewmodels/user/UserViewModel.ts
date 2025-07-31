import { UserService } from '@/services/user.service';
import { CreateUserDto, ListUsersResponse, User } from '@/types/user';

export class UserViewModel {
  private static instance: UserViewModel;

  private constructor() {}

  public static getInstance(): UserViewModel {
    if (!UserViewModel.instance) {
      UserViewModel.instance = new UserViewModel();
    }
    return UserViewModel.instance;
  }

  async listPublicUsers(page: number = 1): Promise<ListUsersResponse> {
    try {
      const { data } = await UserService.listPublicUsers(page);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao listar usuários');
    }
  }


  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    try {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar usuário');
    }
  }

  /**
   * Cria um novo usuário
   */
  async createPublicUser(userData: CreateUserDto): Promise<User> {
    try {
      const { data } = await UserService.createUser(userData);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar usuário');
    }
  }

  /**
   * Edita um usuário existente
   */
  async editUser(id: string, userData: Partial<CreateUserDto>): Promise<User> {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao editar usuário');
    }
  }
} 