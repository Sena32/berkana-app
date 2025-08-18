import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from '@/services/course.service';
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
    const videos = await CourseService.listModuleVideos(id, { Authorization: `Bearer ${token}` });
    return NextResponse.json(videos.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao buscar vídeos do módulo' },
      { status: error.status || 500 }
    );
  }
}