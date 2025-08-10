import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { Badge } from "./Badge";


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
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="daily">Daily Specials</TabsTrigger>
        <TabsTrigger value="full">Full Menu</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="animate-enter">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailySpecials.map((item) => (
            <article key={item.name} className="rounded-xl border p-5 bg-card shadow-sm">
              <header className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="flex gap-2">
                  {item.vegan && <Badge variant="secondary">Vegan</Badge>}
                  {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                </div>
              </header>
              {item.description && (
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
              )}
              {item.price && <p className="font-medium">{item.price}</p>}
            </article>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="full" className="animate-enter">
        <div className="space-y-8">
          {fullMenu.map((group) => (
            <section key={group.category}>
              <h3 className="text-xl font-semibold mb-3">{group.category}</h3>
              <ul className="divide-y">
                {group.items.map((item) => (
                  <li key={item.name} className="py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        )}
                        <div className="mt-1 flex gap-2">
                          {item.vegan && <Badge variant="secondary">Vegan</Badge>}
                          {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                        </div>
                      </div>
                      {item.price && <p className="font-medium whitespace-nowrap">{item.price}</p>}
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
