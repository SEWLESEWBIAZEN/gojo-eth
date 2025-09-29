import formidable, { Fields, Files } from "formidable";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { uploadImageToGallery } from "@/lib/db/gallery";
import supabase from "@/lib/supabase";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

// Convert Web Request to Node Request
function toNodeRequest(request: Request): IncomingMessage {
  const bodyStream = request.body ? Readable.fromWeb(request.body as any) : Readable.from([]);
  return Object.assign(bodyStream, {
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
    url: request.url,
  }) as IncomingMessage;
}

export async function POST(request: Request): Promise<NextResponse<FormatResponse>> {
  const req = toNodeRequest(request);

  const form = formidable({
    multiples: true,
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

      try {
        const allFiles = Object.values(files).flat();
        const uploadedUrls: string[] = [];

        for (const file of allFiles) {
          if (!file) {
            continue; // Skip if file is undefined
          }
          const fileData = await fileToBuffer(file);
          const fileExt = file.originalFilename?.split(".").pop() || "jpg";
          const fileName = `gallery/${Date.now()}-${file.originalFilename}`;

          // Upload to Supabase Storage
          const { data, error } = await supabase.storage
            .from("galleryImages") // your bucket name
            .upload(fileName, fileData, { contentType: file.mimetype || undefined });

          if (error) throw error;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage.from("galleryImages").getPublicUrl(fileName);
          uploadedUrls.push(publicUrl);
        }

        // Optional: save first image info to your DB
        const galleryImage = {
          url: uploadedUrls[0],
          title: fields?.title?.[0] || "",
        };
        // Assuming uploadImageToGallery saves record to DB
        const response = await uploadImageToGallery(galleryImage);

        return resolve(formatResponse({ ...response, data: uploadedUrls }));
      } catch (uploadError: any) {
        console.log(uploadError)
        return resolve(
          formatResponse({
            data: null,
            message: uploadError.message || "Upload error",
            isError: true,
            status: 500,
          })
        );
      }
    });
  });
}

// Helper to convert formidable file to buffer
function fileToBuffer(file: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    const reader = file.filepath ? require("fs").createReadStream(file.filepath) : null;
    if (!reader) return reject(new Error("No file stream"));

    reader.on("data", (chunk:any) => chunks.push(chunk));
    reader.on("end", () => resolve(Buffer.concat(chunks)));
    reader.on("error", reject);
  });
}
