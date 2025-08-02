import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from '@/services/course.service';
import { extractToken } from '@/lib/extractToken';

export async function GET(request: NextRequest) {
  try {
    const isPublic = request.headers.get('isPublic');
    const token = extractToken(request);
    if (!token && !isPublic) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 1;
    const name = searchParams.get('name') || undefined;
    let courses;
    if (isPublic) {
      courses = await CourseService.listPublicCourses(page, name);
    } else {
      courses = await CourseService.listCourses(page, name, { Authorization: `Bearer ${token}` });
    }
    return NextResponse.json(courses.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao listar cursos' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const course = await CourseService.completeModule(body.moduleId, { Authorization: `Bearer ${token}` });
    return NextResponse.json(course.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao completar modulo' },
      { status: error.status || 500 }
    );
  }
} 