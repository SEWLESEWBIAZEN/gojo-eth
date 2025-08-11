import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Badge } from "./ui/Badge";
import Image from 'next/image'

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  spicy?: boolean;
  vegan?: boolean;
};

const dailySpecials: MenuItem[] = [
  { name: "Doro Wot", description: "Spicy chicken stew with egg", price: "$16", spicy: true },
  { name: "Shiro", description: "Creamy ground chickpea stew", price: "$13", vegan: true },
  { name: "Kitfo", description: "Minced beef seasoned with mitmita & niter kibbeh", price: "$18" },
];

const fullMenu: { category: string; items: MenuItem[] }[] = [
  {
    category: "Appetizers",
    items: [
      { name: "Sambusa", description: "Crispy pastry with lentils", price: "$8", vegan: true },
      { name: "Azifa", description: "Green lentil salad", price: "$8", vegan: true },
    ],
  },
  {
    category: "Vegetarian",
    items: [
      { name: "Misir Wot", description: "Red lentils in berbere sauce", price: "$13", vegan: true, spicy: true },
      { name: "Atkilt Alicha", description: "Cabbage, carrots, potatoes", price: "$12", vegan: true },
    ],
  },
  {
    category: "Meat",
    items: [
      { name: "Doro Wot", description: "Chicken stew with egg", price: "$16", spicy: true },
      { name: "Siga Wot", description: "Beef stew in berbere", price: "$17", spicy: true },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Buna (Coffee)", description: "Traditional Ethiopian coffee", price: "$4" },
      { name: "Tea", description: "Black tea with spices", price: "$3" },
    ],
  },
];

export default function MenuTabs() {
  return (
    <Tabs
      defaultValue="daily"
      className="w-full relative pb-4"
    >
      <Image
        src="/menu-bg-1.jpg"
        alt="Restaurant background"
        fill
        priority
        className="object-cover object-center -z-10 opacity-40"
      />

      {/* Tabs List */}
      <TabsList className="mb-6 flex flex-wrap justify-center gap-2 rounded-none">
        <TabsTrigger value="daily" className="px-6 py-4 text-sm md:text-base">
          Daily Specials
        </TabsTrigger>
        <TabsTrigger value="full" className="px-6 py-4 text-sm md:text-base">
          Full Menu
        </TabsTrigger>
      </TabsList>

      {/* Daily Specials */}
      <TabsContent value="daily" className="animate-enter py-14">
        <section className="space-y-8 p-6 bg-transparent backdrop-blur-sm rounded-xl">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 gap-y-4">
            {dailySpecials?.map((item) => (
              <li
                key={item?.name}
                className="w-full sm:max-w-[calc(50%-0.75rem)] hover:cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 p-3 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition">
                  <div>
                    <p className="font-medium text-orange-900">{item?.name}</p>
                    {item?.description && (
                      <p className="text-muted-foreground text-sm">{item?.description}</p>
                    )}
                    <div className="mt-1 flex gap-2 flex-wrap">
                      {item?.vegan && <Badge variant="secondary">Vegan</Badge>}
                      {item?.spicy && <Badge variant="destructive">Spicy</Badge>}
                    </div>
                  </div>
                  {item?.price && (
                    <p className="font-semibold text-orange-700 whitespace-nowrap">
                      {item?.price}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter">
        <div className="space-y-8 rounded-xl bg-transparent shadow-sm ">
          {fullMenu?.map((group) => (
            <section
              key={group?.category}
              className="p-6 bg-transparent backdrop-blur-sm rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-800 drop-shadow-sm">
                {group?.category}
              </h3>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 gap-y-4">
                {group.items?.map((item) => (
                  <li
                    key={item?.name}
                    className="w-full sm:max-w-[calc(50%-0.75rem)] hover:cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4 p-3 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition">
                      <div>
                        <p className="font-medium text-orange-900">{item?.name}</p>
                        {item?.description && (
                          <p className="text-muted-foreground text-sm">{item?.description}</p>
                        )}
                        <div className="mt-1 flex gap-2 flex-wrap">
                          {item?.vegan && <Badge variant="secondary">Vegan</Badge>}
                          {item?.spicy && <Badge variant="destructive">Spicy</Badge>}
                        </div>
                      </div>
                      {item?.price && (
                        <p className="font-semibold text-orange-700 whitespace-nowrap">
                          {item?.price}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
