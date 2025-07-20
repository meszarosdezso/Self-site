import { client } from "../../lib/sanity";
import { Asset } from "../../components/Asset";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

type Food = {
  _id: string;
  name: string;
  images: SanityAsset[];
};

export default async function Page() {
  const menu = await client.fetch<Food[]>(`*[_type == "food"]{
    ...,
    "images": images[].asset->
  }`);

  menu.sort(() => (Math.random() > 0.5 ? 1 : -1));

  const asset = menu[0]?.images[0];

  return (
    <main className="text-white/70 p-10">
      <div className="space-y-10">
        <h1 className="opacity-50 fixed top-10 left-10">Edibles</h1>

        <div className="w-full flex items-center justify-center">
          <ul className="space-y-6 mx-auto">
            {menu.map((item) => (
              <li key={item._id} className="items-end flex-wrap flex gap-6">
                {item.images.map((image) => (
                  <div className="w-[260px] h-[300px] shrink-0">
                    <Asset
                      key={image._key}
                      asset={image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <h4 className="text-sm">{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* {asset && (
        <div className="flex justify-end items-end">
          <Asset asset={asset} className="w-[300px] h-[300px]" />
        </div>
      )} */}
    </main>
  );
}
