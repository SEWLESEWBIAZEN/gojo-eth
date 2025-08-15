import { uploadVideoToGallery } from "@/lib/db/gallery";
import { formatResponse, FormatResponse } from "@/lib/utils";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";

export const config = {
    api: {
        bodyParser: false, // Required for formidable to work
    },
};
function toNodeRequest(request: Request): IncomingMessage {
    const bodyStream = request.body ? Readable.fromWeb(request.body as any) : Readable.from([]);
    return Object.assign(bodyStream, {
        headers: Object.fromEntries(request.headers.entries()),
        method: request.method,
        url: request.url,
    }) as IncomingMessage;
}

function getPublicImagePath(filePath?: string): string {
    if (!filePath) return "";
    return filePath.replace(/^.*?public[\\/]/, "/").replace(/\\/g, "/");
}

export async function POST(request: Request): Promise<NextResponse<FormatResponse>> {
    const req = toNodeRequest(request);
    const form = formidable({
        multiples: true,
        uploadDir: path.join(process.cwd(), "public/gallery"),
        keepExtensions: true,
    });
    return new Promise((resolve) => {
        form.parse(req, async (err: any, fields: Fields, files: Files) => {
            if (err) {
                return resolve(
                    formatResponse({
                        data: null,
                        message: "Form parse error",
                        isError: true,
                        status: 500,
                    })
                );
            }
            // Flatten and parse file paths
            const allFiles = Object.values(files).flat();
            const videoPaths = allFiles.map((file) => getPublicImagePath(file?.filepath));
            const galleryVideo = {
                url: videoPaths[0],
                title: fields?.title?.[0]??"",
            }
            const response = await uploadVideoToGallery(galleryVideo);
            return resolve(formatResponse(response));
        });
    });
}