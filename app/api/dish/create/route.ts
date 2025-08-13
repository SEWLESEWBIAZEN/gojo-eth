import formidable, { Fields, Files} from "formidable";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import path from "path";
import { FormatResponse, formatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { createDish } from "@/lib/db/dishes";
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
export async function POST(request: Request) : Promise<NextResponse<FormatResponse>> {  
  const req = toNodeRequest(request);
  const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), "public/uploads"),
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
      const imagePaths = allFiles.map((file) => getPublicImagePath(file?.filepath));
      // Build the dish object
      const dishData = {
        category_id:"c83e566c-0a88-429e-85c6-1a5e33f2092b",//hard-coded category id
        name: fields?.name?.[0] ?? "",
        description: fields?.description?.[0] ?? "",
        price: Number(fields?.price?.[0]) || 0,
        spicy: Boolean(fields?.spicy?.[0]) === true,
        vegan: Boolean(fields?.vegan?.[0]) === true,
        featured: Boolean(fields?.featured?.[0]) === true,
        rating: Number(fields?.rating?.[0]) || 0,
        images: imagePaths,
      };
const response = await createDish(dishData);


  return resolve(formatResponse({
    data: response.data,
    message: response?.message,
    isError: response.isError,
    status: response.status,
  }));
    });
  });
}
