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

  async listPublicUsers(page: number = 1, searchTerm: string = ''): Promise<ListUsersResponse> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        search: searchTerm,
      });
      const response = await fetch(`/api/user?${params.toString()}`, {
        headers: {
          'method': 'GET',
          'isPublic': 'true',
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
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


  async createPublicUser(userData: CreateUserDto): Promise<User> {
    try {
      const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'isPublic': 'true',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
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