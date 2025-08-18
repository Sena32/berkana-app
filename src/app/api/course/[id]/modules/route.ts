import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from '@/services/course.service';
import { extractToken } from '@/lib/extractToken';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const isPublic = request.headers.get('isPublic');
    const token = extractToken(request);
    if (!token && !isPublic) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    let modules;
    if (token) {
      modules = await CourseService.listCourseModules(id, { Authorization: `Bearer ${token}` });
    } else {
      //TODO: implementar chamada a API publica
      modules = await CourseService.listCourseModules(id);
    }
    return NextResponse.json(modules.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao buscar módulos do curso' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(
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

    const course = await CourseService.completeModule(id, { Authorization: `Bearer ${token}` });
    return NextResponse.json(course.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao completar módulo' },
      { status: error.status || 500 }
    );
  }
}