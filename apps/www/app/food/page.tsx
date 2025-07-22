import { client } from "../../lib/sanity";
import { Asset } from "../../components/Asset";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { Clock } from "react-feather";

type Food = {
  _id: string;
  name: string;
  images: SanityAsset[];
};

function MenuList({ menu }: { menu: Food[] }) {
  return (
    <ul className="space-y-6">
      {menu.map((item) => (
        <li key={item._id} className="items-end flex-wrap flex gap-2 relative">
          <div className="flex gap-6">
            {item.images.map((image) => (
              <div key={image._id} className="w-[260px] h-[300px] shrink-0">
                <Asset asset={image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <h4 className="font-bold text-4xl max-w-[200px]">{item.name}</h4>
        </li>
      ))}
    </ul>
  );
}

export default async function Page() {
  const menu = await client.fetch<
    Food[]
  >(`*[_type == "food"] | order(name asc) {
    ...,
    "images": images[].asset->
  }`);

  return (
    <main className="bg-white px-20 py-9 min-h-screen text-black">
      <div className="flex">
        <div className="w-[300px] h-full inset-0 flex items-end justify-end fixed">
          <h1 className="text-9xl font-light tracking-tighter origin-bottom-left translate-x-full -translate-y-6 -rotate-90">
            Edibles
          </h1>
        </div>

        <div className="pl-[240px]">
          <MenuList menu={menu} />
        </div>
      </div>
    </main>
  );
}
