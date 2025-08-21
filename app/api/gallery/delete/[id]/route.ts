import { NextResponse } from 'next/server';
import { formatResponse, FormatResponse } from '@/lib/utils';
import { deleteFromGallery } from '@/lib/db/gallery';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const response = await deleteFromGallery(id);

  return formatResponse(response);
}