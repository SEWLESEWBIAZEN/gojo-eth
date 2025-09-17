
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Image, Video } from "lucide-react";
import AdminVideoGallery from "@/components/gallery/AdminVideoGallery";
import AdminImageGallery from "@/components/gallery/AdminImageGallery";
import AddToGallery from "@/components/gallery/AddToGallery";

export default function GalleryDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 animate-enter">
      <div className="flex w-full items-center justify-end">
          <AddToGallery />
        </div>
        <Tabs defaultValue="image-gallery" className="w-full relative mt-4">
          <TabsList>
            <TabsTrigger className="data-[state=active]:text-indigo-800 text-indigo-900" value="image-gallery"><Image className="mr-2 h-6 w-5 " /> Image Gallery</TabsTrigger>
            <TabsTrigger className="data-[state=active]:text-indigo-800 text-indigo-900" value="video-gallery"><Video className="mr-2 h-6 w-5 " /> Video Gallery</TabsTrigger>
          </TabsList>
          <br />
          <TabsContent value="image-gallery" className="animate-enter py-4">
            <AdminImageGallery />
          </TabsContent>
          <TabsContent value="video-gallery" className="animate-enter py-4">
            <AdminVideoGallery />
          </TabsContent>
        </Tabs>
     
    </div>
  );
}
