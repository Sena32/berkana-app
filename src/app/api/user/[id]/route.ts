import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { extractToken } from '@/lib/extractToken';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    const user = await UserService.getUserById(id, { Authorization: `Bearer ${token}` });
    return NextResponse.json(user.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao buscar usuário' },
      { status: error.status || 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const user = await UserService.editUser(id, body, { Authorization: `Bearer ${token}` });
    return NextResponse.json(user.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao editar usuário' },
      { status: error.status || 500 }
    );
  }
}