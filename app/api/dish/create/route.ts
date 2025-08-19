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
        
      const dishData = {
        category_id:fields?.category?.[0] ?? "",
        name: fields?.name?.[0] ?? "",
        description: fields?.description?.[0] ?? "",
        price: parseFloat(fields?.price?.[0]??"0.000") || 0,
        spicy: (fields?.spicy?.[0]) === "true",
        vegan: (fields?.vegan?.[0]) === "true",
        featured: (fields?.featured?.[0]) === "true",
        rating: parseFloat(fields?.rating?.[0]??"0.000") || 0,
        images: imagePaths,
      };
const response = await createDish(dishData);


  return resolve(formatResponse(response));
    });
  });
}
