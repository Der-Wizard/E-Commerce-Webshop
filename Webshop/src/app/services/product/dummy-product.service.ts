import { Injectable } from '@angular/core';
import { ProductService } from './abstract-product-service';
import { Product } from './models/product';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyProductService extends ProductService {
  protected filteredProducts: Product[] = [];
  protected override pageSize: number = 50;
  override searchTerm: string = '';
  protected override searchCategory: string = '';

  override page$ = new BehaviorSubject<number>(1);
  override pageCount$ = new BehaviorSubject<number>(1);
  override currentProducts$ = new BehaviorSubject<Product[]>([]);

  constructor() {
    super();
  }

  override search(): void {
    this.updateCurrentProducts();
  }

  override increasePageIndex(): void {
    if (this.page$.value >= this.pageCount$.value) {
      this.page$.value === this.pageCount$.value;
      return;
    }
    this.page$.next(this.page$.value + 1)
    this.updateCurrentProducts();
  }
  override decreasePageIndex(): void {
    if (this.page$.value <= 1) {
      this.page$.value === 1;
      return;
    }
    this.page$.next(this.page$.value - 1)
    this.updateCurrentProducts();
  }
  override setPageIndex(value: number): void {
    if (value < 1 || value > this.pageCount$.value) {
      return;
    }
    this.page$.next(value);
    this.updateCurrentProducts();
  }

  override setPageSize(value: number): void {
    this.pageSize = value;
    this.updateCurrentProducts();
  }

  override setSearchCategory(value: string): void {
    this.searchCategory = value;
    this.updateCurrentProducts();
  }

  override getSearchTerm(): string {
    return this.searchTerm;
  }

  override setSearchTerm(value: string): void {
    this.searchTerm = value;
    this.updateCurrentProducts();
  }

  protected override fetchProducts(): Observable<Product[]> {
    return of(this.dummyData.filter(x => this.searchCategory !== '' ? this.searchCategory === x.category : true)
      .filter(x => this.searchTerm !== '' ? x.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
    );
  }
  protected override fetchProductById(id: string): Observable<Product | undefined> {
    return of(this.dummyData.find(x => x.id === id) ?? undefined);
  }

  override getProductById(id: string): Observable<Product | undefined> {
    return this.fetchProductById(id).pipe(
      map(product => product)
    );
  }

  protected updateCurrentProducts(): void {
    this.fetchProducts().subscribe((products: Product[]) => {
        this.filteredProducts = products;

        this.pageCount$.next(Math.ceil(this.filteredProducts.length / this.pageSize));
        if (this.pageCount$.value < this.page$.value)
            this.page$.next(this.pageCount$.value);
        if (this.page$.value < 1)
            this.page$.next(1);

        const start = (this.page$.value - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentProducts$.next(this.filteredProducts.slice(start, end));
    });
}

  private dummyData: Product[] = [
    { id: "e3b28f9c-1e51-4e0c-b1fc-6b3d1fef7491", name: "Lunatic : Switch", description: "A JRPG set in a post-apocalyptic world where players navigate a rich narrative and engage in turn-based combat with deep character development.", price: 39.99, category: "VideoGames" },
    { id: "c2d028f3-1234-4a6b-b1fc-6b3d1fef7492", name: "Lunatic : PC", description: "A JRPG set in a post-apocalyptic world where players navigate a rich narrative and engage in turn-based combat with deep character development.", price: 39.99, category: "VideoGames" },
    { id: "a94d5f61-2d36-4dce-8378-f3797542ff4e", name: "Throne : XBOX", description: "A multiplayer fighter game featuring advanced and realistic mechanics, allowing players to engage in epic battles across various dynamic arenas.", price: 49.99, category: "VideoGames" },
    { id: "b74d5f61-3a45-4e6e-8c38-f3797542ff4f", name: "Throne : PS5", description: "A multiplayer fighter game featuring advanced and realistic mechanics, allowing players to engage in epic battles across various dynamic arenas.", price: 49.99, category: "VideoGames" },
    { id: "d84d5f61-4b56-4f7f-9d48-f3797542ff5a", name: "Throne : PC", description: "A multiplayer fighter game featuring advanced and realistic mechanics, allowing players to engage in epic battles across various dynamic arenas.", price: 49.99, category: "VideoGames" },
    { id: "e3b28f9c-1e51-4e0c-b1fc-6b3d1fef7491", name: "Lunatic Artbook", description: "An artbook showcasing stunning illustrations and concept art from the world of Lunatic, providing insights into character design and environments.", price: 29.99, category: "Books" },
    { id: "c2d028f3-1234-4a6b-b1fc-6b3d1fef7492", name: "Throne Artbook", description: "A comprehensive artbook that dives deep into the visual development of Throne, featuring character art, level design, and more.", price: 34.99, category: "Books" },
    { id: "a94d5f61-2d36-4dce-8378-f3797542ff4e", name: "The Beginning of Corruption", description: "A gripping tale about the villain Vaara and her descent into darkness, revealing the choices that led to her corruption.", price: 24.99, category: "Books" },
    { id: "b74d5f61-3a45-4e6e-8c38-f3797542ff4f", name: "How Expectations Crumble Us", description: "The story of a king who abandoned his kingdom, exploring the heavy burden of leadership and the consequences of his choices.", price: 24.99, category: "Books" },
    { id: "d84d5f61-4b56-4f7f-9d48-f3797542ff5a", name: "Where Is Home", description: "A touching narrative about the dragon Ohn's kidnapping and forced servitude, revealing his quest to reclaim his freedom and find his true home.", price: 24.99, category: "Books" },
    { id: "e6e95c0b-5e72-4b88-9e99-h6397542ff5c", name: "The King of Frozen", description: "A tale about Felix, the tyrannical overlord of the North, whose oppressive reign brings fear and unrest to his people.", price: 24.99, category: "Books" },
    { id: "f7f42c67-5f83-4f99-9f67-i6397542ff6d", name: "The Queen of Flowers", description: "The story of a beautiful matriarch of the West, whose charm and wisdom shape the destiny of her realm.", price: 24.99, category: "Books" },
    { id: "g8f52c67-5e93-4b88-9e99-j6397542ff8f", name: "Blades Crossed", description: "An action-packed narrative about Zeya, an ally who grew up to be a warrior, facing challenges that test her strength and loyalty.", price: 24.99, category: "Books" },
    { id: "h9f62c67-5f03-4f99-9e99-k6397542ff9g", name: "Stars Aligned", description: "The story of Astra Nowira, the seer and guardian of the stars, who attempts to save her people but faces failure in her quest.", price: 24.99, category: "Books" },
    { id: "i0f72c67-5f13-4f99-9e99-l6397542ff0h", name: "Pride", description: "A tale about a prideful Arabian warrior who pursues his enemy to take revenge for his fallen comrades, exploring themes of honor and vengeance.", price: 24.99, category: "Books" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35f", name: "Rise of Vaara", description: "A stunning poster showcasing the main character from Lunatic in an epic pose.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35g", name: "Wasteland Dreams", description: "An atmospheric poster depicting the post-apocalyptic landscape of Lunatic.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35h", name: "Vaara's Dark Embrace", description: "A vibrant poster featuring the villain Vaara surrounded by dark energy.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35i", name: "Clash of Titans", description: "An action-packed poster showcasing a battle scene between the heroes and monsters.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35j", name: "Home Before the Fall", description: "A detailed poster of the protagonist's hometown before the apocalypse.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35k", name: "Creatures of the Night", description: "A poster highlighting the diverse creatures that inhabit the Lunatic world.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35l", name: "Vaara's Reckoning", description: "An artistic poster showcasing the main antagonist in dramatic lighting.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35m", name: "Map of Despair", description: "A panoramic poster of the world map of Lunatic, featuring key locations.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35n", name: "Heroes Unite", description: "A poster featuring a crucial moment from the game's story with key characters.", price: 14.99, category: "Posters" },
    { id: "1b01a7e7-bb49-4c14-bc4b-df743192c35o", name: "Magic Awakened", description: "A mystical poster showcasing magical elements and spells from the game.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35p", name: "Felix the Tyrant", description: "A striking poster of Felix, the tyrannical overlord, commanding his army.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35q", name: "Queen of Flowers", description: "A beautiful poster of the Queen of Flowers surrounded by blooming flora.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35r", name: "Zeya's Valor", description: "An action poster showcasing Zeya in a fierce battle stance.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35s", name: "Astra and the Stars", description: "A captivating poster of Astra Nowira looking at the stars, deep in thought.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35t", name: "Revenge of the Arabian Warrior", description: "A dramatic poster of the Arabian warrior preparing for battle.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35u", name: "Rise of the Oppressed", description: "A fierce poster showcasing the struggles of the people under Felix's reign.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35v", name: "Land of Legends", description: "A majestic poster depicting the vast landscape of the Throne kingdom.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35w", name: "Moments of Reflection", description: "An intimate poster showcasing a moment of reflection between characters.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35x", name: "Symbols of Power", description: "A bold poster displaying the symbols and sigils of the Throne factions.", price: 14.99, category: "Posters" },
    { id: "2b01a7e7-bb49-4c14-bc4b-df743192c35y", name: "Loyalty and Betrayal", description: "A thematic poster highlighting the essence of loyalty and betrayal in the game.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c35z", name: "Guardians of the Night", description: "A mesmerizing poster featuring the various magical creatures of Lunatic.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c360", name: "The Final Stand", description: "A dramatic representation of the heroes' last stand against darkness.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c361", name: "Pivotal Moments", description: "An artistic depiction of the pivotal moments in Lunatic's storyline.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c362", name: "Ohn's Legacy", description: "A portrait of the dragon Ohn, a key character in Lunatic's narrative.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c363", name: "Landscapes of Despair", description: "A detailed poster of the diverse landscapes found within the Lunatic world.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c364", name: "Journey into Darkness", description: "A striking visual of the hero's journey into the heart of darkness.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c365", name: "Clash of Fates", description: "An epic battle poster depicting key characters in the midst of conflict.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c366", name: "The Matriarch's Call", description: "A mesmerizing poster of the Matriarch summoning her allies.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c367", name: "Legends of the Abyss", description: "A stunning depiction of the legends from the Abyssal realms.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c368", name: "Conquest of the Shadows", description: "An intense poster showcasing the battle against the shadowy enemies.", price: 14.99, category: "Posters" },
    { id: "3b01a7e7-bb49-4c14-bc4b-df743192c369", name: "Echoes of the Past", description: "A reflective poster that captures the echoes of characters' pasts.", price: 14.99, category: "Posters" },
    { id: "1c4a8bce-5c38-4e61-8a75-cb23c3f8b69a", name: "Vaara Pin Set", description: "A set of 4 pins featuring Vaara in different expressions and poses.", price: 9.99, category: "Pin Sets" },
    { id: "1c4a8bce-5c38-4e61-8a75-cb23c3f8b69b", name: "Heroic Trio Pin Set", description: "A collection of pins featuring the main heroes of  the warrior, mage, and rogue.", price: 9.99, category: "Pin Sets" },
    { id: "1c4a8bce-5c38-4e61-8a75-cb23c3f8b69c", name: "Creatures of the Wasteland Pin Set", description: "A set of pins showcasing the unique creatures from the Lunatic universe.", price: 9.99, category: "Pin Sets" },
    { id: "2c4a8bce-5c38-4e61-8a75-cb23c3f8b69d", name: "Felix the Tyrant Pin Set", description: "A set of 4 pins featuring Felix in various poses representing his tyrannical nature.", price: 9.99, category: "Pin Sets" },
    { id: "2c4a8bce-5c38-4e61-8a75-cb23c3f8b69e", name: "The Matriarch Pin Set", description: "A beautiful pin set featuring the Queen of Flowers in elegant designs.", price: 9.99, category: "Pin Sets" },
    { id: "2c4a8bce-5c38-4e61-8a75-cb23c3f8b69f", name: "Zeya and Allies Pin Set", description: "A set of pins featuring Zeya and her allies, showcasing their strength and unity.", price: 9.99, category: "Pin Sets" },
    { id: "1d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f29", name: "Vaara Sticker Set", description: "A set of 10 stickers featuring Vaara in various poses and expressions.", price: 5.99, category: "Stickers" },
    { id: "1d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f30", name: "Heroes of the Wasteland Sticker Set", description: "A collection of stickers featuring the main heroes from Lunatic.", price: 5.99, category: "Stickers" },
    { id: "1d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f31", name: "Magical Creatures Sticker Set", description: "A whimsical sticker set showcasing the magical creatures of Lunatic.", price: 5.99, category: "Stickers" },
    { id: "2d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f32", name: "Felix the Tyrant Sticker Set", description: "A set of 10 stickers featuring Felix in his various forms of tyranny.", price: 5.99, category: "Stickers" },
    { id: "2d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f33", name: "Queen of Flowers Sticker Set", description: "A collection of stickers depicting the Queen of Flowers in beautiful designs.", price: 5.99, category: "Stickers" },
    { id: "2d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f34", name: "Allies of Zeya Sticker Set", description: "A set of stickers featuring Zeya and her loyal allies.", price: 5.99, category: "Stickers" },
    { id: "3d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f35", name: "Epic Battles Sticker Set", description: "A dynamic sticker set showcasing epic battle scenes from Lunatic.", price: 5.99, category: "Stickers" },
    { id: "3d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f36", name: "Symbols of Magic Sticker Set", description: "A mystical sticker set featuring various symbols of magic from Lunatic.", price: 5.99, category: "Stickers" },
    { id: "3d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f37", name: "Tyranny and Rebellion Sticker Set", description: "A thought-provoking sticker set depicting the themes of tyranny and rebellion.", price: 5.99, category: "Stickers" },
    { id: "4d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f38", name: "Stories of the Fallen Sticker Set", description: "A reflective sticker set featuring key moments of fallen heroes in Throne.", price: 5.99, category: "Stickers" },
    { id: "4d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f39", name: "Corruption and Redemption Sticker Set", description: "A powerful sticker set illustrating the themes of corruption and redemption in Lunatic.", price: 5.99, category: "Stickers" },
    { id: "5d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f40", name: "Guardians of the Realm Sticker Set", description: "A set of stickers showcasing the guardians protecting the Throne kingdom.", price: 5.99, category: "Stickers" },
    { id: "5d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f41", name: "Iconic Locations Sticker Set", description: "A sticker set highlighting iconic locations from the Lunatic world.", price: 5.99, category: "Stickers" },
    { id: "5d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f42", name: "Legends of the North Sticker Set", description: "A collection of stickers depicting legendary figures from the Throne North.", price: 5.99, category: "Stickers" },
    { id: "6d5a9cfe-6a92-4c3e-b5eb-e3be8d2a3f43", name: "Emblems of Hope Sticker Set", description: "A motivational sticker set featuring emblems of hope from Lunatic.", price: 5.99, category: "Stickers" },
    //Plushies
    { id: "1e6b8bce-6f98-42c9-9183-e0f3e6e7b599", name: "Vaara Plushie", description: "A soft and cuddly plushie of Vaara, the dark villain from Lunatic.", price: 24.99, category: "Plushies" },
    { id: "1e6b8bce-6f98-42c9-9183-e0f3e6e7b59a", name: "Heroic Trio Plushies", description: "A set of plushies featuring the three main heroes from Lunatic.", price: 39.99, category: "Plushies" },
    { id: "1e6b8bce-6f98-42c9-9183-e0f3e6e7b59b", name: "Magical Creature Plushie", description: "A cute plushie of one of the magical creatures from the Lunatic universe.", price: 19.99, category: "Plushies" },
    { id: "2e6b8bce-6f98-42c9-9183-e0f3e6e7b59c", name: "Felix the Tyrant Plushie", description: "A plushie of Felix, the tyrannical overlord from Throne, dressed in his regal attire.", price: 24.99, category: "Plushies" },
    { id: "2e6b8bce-6f98-42c9-9183-e0f3e6e7b59d", name: "Queen of Flowers Plushie", description: "A beautiful plushie of the Queen of Flowers, adorned with floral patterns.", price: 24.99, category: "Plushies" },
    { id: "2e6b8bce-6f98-42c9-9183-e0f3e6e7b59e", name: "Zeya Plushie", description: "A plushie of Zeya, the fierce warrior and ally, ready for battle.", price: 24.99, category: "Plushies" },
    { id: "3f8c8bce-7c3d-4d1a-8d37-b3e28f5e7c40", name: "Vaara Action Figure", description: "An intricately designed action figure of Vaara, showcasing her dark powers.", price: 69.99, category: "Figures" },
    { id: "3f8c8bce-7c3d-4d1a-8d37-b3e28f5e7c41", name: "Felix the Tyrant Figure", description: "A detailed figure of Felix, the tyrannical overlord, complete with his throne.", price: 69.99, category: "Figures" },
    //Bags
    { id: "4g1c8bce-8e4e-4a12-9b1e-d4e24e4c9e72", name: "Vaara Tote Bag", description: "A stylish tote bag featuring artwork of Vaara from Lunatic, perfect for everyday use.", price: 129.99, category: "Bags" },
    { id: "4g1c8bce-8e4e-4a12-9b1e-d4e24e4c9e73", name: "Kingdom Crest Backpack", description: "A durable backpack adorned with the crest of the Throne kingdom, suitable for school or travel.", price: 149.99, category: "Bags" },
    //KeyChains
    { id: "5h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b81", name: "Vaara Key Chain", description: "A stylish key chain featuring a detailed charm of Vaara.", price: 3.99, category: "KeyChains" },
    { id: "5h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b82", name: "Heroic Trio Key Chain Set", description: "A set of key chains featuring the three main heroes.", price: 34.99, category: "KeyChains" },
    { id: "5h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b83", name: "Magical Creature Key Chain", description: "A cute key chain showcasing one of the magical creatures.", price: 3.99, category: "KeyChains" },
    { id: "6h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b84", name: "Felix the Tyrant Key Chain", description: "An intricate key chain featuring Felix in his regal form.", price: 3.99, category: "KeyChains" },
    { id: "6h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b85", name: "Queen of Flowers Key Chain", description: "A beautiful key chain depicting the Queen of Flowers.", price: 3.99, category: "KeyChains" },
    { id: "6h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b86", name: "Zeya Key Chain", description: "A stylish key chain featuring Zeya, ready for battle.", price: 3.99, category: "KeyChains" },
    { id: "7h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b87", name: "Epic Battles Key Chain Set", description: "A set of key chains showcasing epic battle scenes.", price: 4.99, category: "KeyChains" },
    { id: "7h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b88", name: "Symbols of Magic Key Chain", description: "A key chain featuring various symbols of magic.", price: 3.99, category: "KeyChains" },
    { id: "7h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b89", name: "Guardians Key Chain Set", description: "A collection of key chains featuring the guardians.", price: 4.99, category: "KeyChains" },
    { id: "8h2d9cfe-9f4f-4f82-ae35-e2d55f1b3b90", name: "Emblems of Hope Key Chain", description: "A motivational key chain featuring emblems of hope.", price: 3.99, category: "KeyChains" },
    //Stand
    { id: "9i3b8cfe-5e7a-4c9f-bc3d-d8d69e9e0f12", name: "Display Stand for Collectibles", description: "A sturdy display stand designed to showcase your favorite collectibles from Lunatic and Throne.", price: 134.99, category: "Stand" },
    //Lanyard
    { id: "a1d1d8d8-52e8-4e09-93ea-456defae1b01", name: "Vaara Lanyard", description: "A stylish lanyard featuring an artistic design of Vaara.", price: 12.99, category: "Lanyard" },
    { id: "a1d1d8d8-52e8-4e09-93ea-456defae1b02", name: "Heroic Trio Lanyard", description: "A lanyard showcasing the three heroes from Lunatic.", price: 12.99, category: "Lanyard" },
    { id: "a1d1d8d8-52e8-4e09-93ea-456defae1b03", name: "Magical Creatures Lanyard", description: "A colorful lanyard featuring various magical creatures from Lunatic.", price: 12.99, category: "Lanyard" },
    { id: "b2e3e8f8-43d2-4e09-91ea-234abcde2b01", name: "Felix Lanyard", description: "A striking lanyard depicting Felix the tyrant.", price: 12.99, category: "Lanyard" },
    { id: "b2e3e8f8-43d2-4e09-91ea-234abcde2b02", name: "Queen of Flowers Lanyard", description: "A beautiful lanyard showcasing the Queen of Flowers.", price: 12.99, category: "Lanyard" },
    { id: "b2e3e8f8-43d2-4e09-91ea-234abcde2b03", name: "Zeya Lanyard", description: "A bold lanyard featuring Zeya ready for battle.", price: 12.99, category: "Lanyard" },
    { id: "c3f4f8g8-24d3-5e09-72ea-123defae3b01", name: "Epic Battles Lanyard", description: "A lanyard depicting epic battle scenes from Throne.", price: 12.99, category: "Lanyard" },
    { id: "c3f4f8g8-24d3-5e09-72ea-123defae3b02", name: "Symbols of Magic Lanyard", description: "A colorful lanyard featuring magical symbols.", price: 12.99, category: "Lanyard" },
    { id: "c3f4f8g8-24d3-5e09-72ea-123defae3b03", name: "Guardians Lanyard", description: "A lanyard showcasing the guardians from the games.", price: 12.99, category: "Lanyard" },
    { id: "d4g5g9h9-35e4-6e09-53ea-345defae4b01", name: "Emblems of Hope Lanyard", description: "An inspiring lanyard featuring emblems of hope.", price: 12.99, category: "Lanyard" },
    { id: "d4g5g9h9-35e4-6e09-53ea-345defae4b02", name: "Lunatic Logo Lanyard", description: "A lanyard featuring the Lunatic logo.", price: 12.99, category: "Lanyard" },
    { id: "d4g5g9h9-35e4-6e09-53ea-345defae4b03", name: "Throne Logo Lanyard", description: "A lanyard featuring the Throne logo.", price: 12.99, category: "Lanyard" },
    { id: "e5h6h0i0-46f5-7f09-64ea-456defae5b01", name: "Art of War Lanyard", description: "A lanyard showcasing the art of war in Throne.", price: 12.99, category: "Lanyard" },
    { id: "e5h6h0i0-46f5-7f09-64ea-456defae5b02", name: "Dragon's Fury Lanyard", description: "A lanyard featuring the fierce dragons from Lunatic.", price: 12.99, category: "Lanyard" },
    { id: "e5h6h0i0-46f5-7f09-64ea-456defae5b03", name: "Valiant Warriors Lanyard", description: "A lanyard showcasing the valiant warriors of both games.", price: 12.99, category: "Lanyard" },
    { id: "f6i7i1j1-57g6-8g09-75ea-567defae6b01", name: "Lunatic Dream Lanyard", description: "A whimsical lanyard featuring dreamy scenes from Lunatic.", price: 12.99, category: "Lanyard" },
    { id: "f6i7i1j1-57g6-8g09-75ea-567defae6b02", name: "Throne Legacy Lanyard", description: "A lanyard showcasing the legacy of Throne.", price: 12.99, category: "Lanyard" },
    { id: "f6i7i1j1-57g6-8g09-75ea-567defae6b03", name: "Epic Adventures Lanyard", description: "A lanyard featuring epic adventures from both games.", price: 12.99, category: "Lanyard" },
    { id: "g7j8j2k2-68h7-9h09-86ea-678defae7b01", name: "Lunatic Quest Lanyard", description: "A lanyard that captures the essence of quests in Lunatic.", price: 12.99, category: "Lanyard" },
    { id: "g7j8j2k2-68h7-9h09-86ea-678defae7b02", name: "Throne Challenges Lanyard", description: "A lanyard showcasing the challenges faced in Throne.", price: 12.99, category: "Lanyard" },
    { id: "g7j8j2k2-68h7-9h09-86ea-678defae7b03", name: "Mystic Realms Lanyard", description: "A lanyard featuring the mystic realms from both games.", price: 12.99, category: "Lanyard" },
    { id: "h8k9k3l3-79i8-0i09-97ea-789defae8b01", name: "Vaara's Powers Lanyard", description: "A lanyard depicting the powers of Vaara.", price: 12.99, category: "Lanyard" },
    { id: "h8k9k3l3-79i8-0i09-97ea-789defae8b02", name: "Throne Alliances Lanyard", description: "A lanyard showcasing the alliances formed in Throne.", price: 12.99, category: "Lanyard" },
    { id: "h8k9k3l3-79i8-0i09-97ea-789defae8b03", name: "Mythical Creatures Lanyard", description: "A lanyard featuring various mythical creatures from the games.", price: 12.99, category: "Lanyard" },
    // Cups
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789031", name: "Lunatic Adventure Cup", description: "A stylish cup featuring a graphic of Lunatic's vibrant world.", price: 14.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789032", name: "Throne Victory Cup", description: "A cup that celebrates your victories in Throne.", price: 14.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789033", name: "Vaara's Dark Elixir Cup", description: "A cup inspired by Vaara's mysterious powers.", price: 14.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789034", name: "Queen of Flowers Cup", description: "A beautiful cup featuring the enchanting Queen of Flowers.", price: 14.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789035", name: "Epic Battle Cup", description: "A cup showcasing epic battle scenes from both games.", price: 14.99, category: "Homeware" },
    // Mugs
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789036", name: "Lunatic Hero Mug", description: "A mug featuring the heroes from Lunatic's adventures.", price: 19.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789037", name: "Throne Guardian Mug", description: "A mug showcasing the guardians of Throne.", price: 19.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789038", name: "Ohn's Quest Mug", description: "A mug dedicated to the dragon Ohn's heroic journey.", price: 19.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789039", name: "Mystical Realms Mug", description: "A mug featuring the mystical realms from both games.", price: 19.99, category: "Homeware" },
    { id: "f1g2h3i4-90b2-4c9d-8e70-123456789040", name: "Epic Heroes Mug", description: "A mug showcasing the epic heroes from Lunatic and Throne.", price: 19.99, category: "Homeware" },

    { id: "c1d2e3f4-60c2-48b9-8a50-123456789041", name: "Lunatic Warrior Cap", description: "A stylish cap featuring the emblem of Lunatic's warriors.", price: 34.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789042", name: "Throne Champion Hat", description: "A hat representing the champions of Throne.", price: 34.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789043", name: "Vaara's Dark Crown", description: "A unique crown inspired by Vaara's dark powers.", price: 29.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789044", name: "Queen of Flowers Floral Cap", description: "A cap adorned with floral patterns inspired by the Queen of Flowers.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789045", name: "Lunatic Mage Hat", description: "A mystical hat worn by the mages of Lunatic.", price: 29.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789046", name: "Throne's Frozen Beanie", description: "A warm beanie featuring icy designs from Throne.", price: 39.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789047", name: "Epic Battle Helmet", description: "A rugged helmet showcasing epic battle scenes.", price: 34.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789048", name: "Ohn's Flight Cap", description: "A cap featuring Ohn, the dragon, in flight.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789049", name: "Legendary Quests Hat", description: "A hat that celebrates the legendary quests from both games.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789050", name: "Throne Alliance Cap", description: "A cap showcasing the alliances formed in Throne.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789051", name: "Vaara's Mystic Hat", description: "A hat that embodies the mystique of Vaara.", price: 29.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789052", name: "Floral Fantasy Cap", description: "A cap inspired by the beauty of the floral realm.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789053", name: "Frozen Wilderness Hat", description: "A hat inspired by the frozen wilderness of Throne.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789054", name: "Lunatic's Guardian Cap", description: "A cap featuring the guardians of Lunatic.", price: 24.99, category: "Hats" },
    { id: "c1d2e3f4-60c2-48b9-8a50-123456789055", name: "Throne Legacy Hat", description: "A hat celebrating the legacy of Throne.", price: 24.99, category: "Hats" },

    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789056", name: "Lunatic Warrior Shirt", description: "A stylish shirt featuring the emblem of Lunatic's warriors.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789057", name: "Throne Champion Tee", description: "A tee that represents the champions of Throne.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789058", name: "Vaara's Dark Side Shirt", description: "A shirt inspired by Vaara's mysterious powers.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789059", name: "Queen of Flowers Shirt", description: "A beautiful shirt featuring floral patterns inspired by the Queen of Flowers.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789060", name: "Lunatic Mage Tee", description: "A mystical tee worn by the mages of Lunatic.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789061", name: "Throne's Frozen Tee", description: "A cold-themed tee inspired by Throne's icy landscapes.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789062", name: "Epic Battle Shirt", description: "A shirt showcasing epic battles from both games.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789063", name: "Ohn's Quest Shirt", description: "A shirt dedicated to Ohn's heroic journey.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789064", name: "Legendary Quests Tee", description: "A tee that celebrates legendary quests from both games.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789065", name: "Throne Alliance Shirt", description: "A shirt showcasing the alliances formed in Throne.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789066", name: "Vaara's Mystic Tee", description: "A tee that embodies the mystique of Vaara.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789067", name: "Floral Fantasy Shirt", description: "A shirt inspired by the beauty of the floral realm.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789068", name: "Frozen Wilderness Shirt", description: "A shirt inspired by the frozen wilderness of Throne.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789069", name: "Lunatic's Guardian Tee", description: "A tee featuring the guardians of Lunatic.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789070", name: "Throne Legacy Tee", description: "A tee celebrating the legacy of Throne.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789071", name: "Lunatic Dream Shirt", description: "A shirt that captures the essence of Lunatic's dreamlike world.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789072", name: "Throne's Honor Shirt", description: "A shirt celebrating the honor of Throne's warriors.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789073", name: "Epic Heroes Tee", description: "A tee showcasing the epic heroes from Lunatic and Throne.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789074", name: "Battle Ready Shirt", description: "A shirt that prepares you for epic battles ahead.", price: 29.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789075", name: "Lunatic Exploration Tee", description: "A tee dedicated to exploration in Lunatic's vast world.", price: 24.99, category: "Shirts" },
    { id: "d1e2f3g4-70a1-4b3e-b38a-123456789076", name: "Throne Conqueror Shirt", description: "A shirt that embodies the spirit of conquest in Throne.", price: 29.99, category: "Shirts" },

    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789077", name: "Lunatic Warrior Hoodie", description: "A cozy hoodie featuring the emblem of Lunatic's warriors.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789078", name: "Throne Champion Hoodie", description: "A hoodie that represents the champions of Throne.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789079", name: "Vaara's Dark Hoodie", description: "A stylish hoodie inspired by Vaara's mysterious powers.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789080", name: "Queen of Flowers Hoodie", description: "A beautiful hoodie featuring floral patterns inspired by the Queen of Flowers.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789081", name: "Lunatic Mage Hoodie", description: "A mystical hoodie worn by the mages of Lunatic.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789082", name: "Throne's Frozen Hoodie", description: "A cold-themed hoodie inspired by Throne's icy landscapes.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789083", name: "Epic Battle Hoodie", description: "A hoodie showcasing epic battles from both games.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789084", name: "Ohn's Quest Hoodie", description: "A hoodie dedicated to Ohn's heroic journey.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789085", name: "Legendary Quests Hoodie", description: "A hoodie that celebrates legendary quests from both games.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789086", name: "Throne Alliance Hoodie", description: "A hoodie showcasing the alliances formed in Throne.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789087", name: "Vaara's Mystic Hoodie", description: "A hoodie that embodies the mystique of Vaara.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789088", name: "Floral Fantasy Hoodie", description: "A hoodie inspired by the beauty of the floral realm.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789089", name: "Frozen Wilderness Hoodie", description: "A hoodie inspired by the frozen wilderness of Throne.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789090", name: "Lunatic's Guardian Hoodie", description: "A hoodie featuring the guardians of Lunatic.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789091", name: "Throne Legacy Hoodie", description: "A hoodie celebrating the legacy of Throne.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789092", name: "Lunatic Dream Hoodie", description: "A hoodie that captures the essence of Lunatic's dreamlike world.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789093", name: "Throne's Honor Hoodie", description: "A hoodie celebrating the honor of Throne's warriors.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789094", name: "Epic Heroes Hoodie", description: "A hoodie showcasing the epic heroes from Lunatic and Throne.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789095", name: "Battle Ready Hoodie", description: "A hoodie that prepares you for epic battles ahead.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789096", name: "Lunatic Exploration Hoodie", description: "A hoodie dedicated to exploration in Lunatic's vast world.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789097", name: "Throne Conqueror Hoodie", description: "A hoodie that embodies the spirit of conquest in Throne.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789098", name: "Lunatic's Dreamscape Hoodie", description: "A hoodie inspired by the dreamscape of Lunatic.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789099", name: "Frozen Heart Hoodie", description: "A hoodie representing the cold heart of Throne's tyrants.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789100", name: "Throne's Might Hoodie", description: "A hoodie that showcases the might of Throne's armies.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789101", name: "Lunatic's Shadow Hoodie", description: "A hoodie that embodies the shadows of Lunatic's dark secrets.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789102", name: "Tales of the Throne Hoodie", description: "A hoodie inspired by the tales of Throne's heroes.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789103", name: "Ohn's Legacy Hoodie", description: "A cozy hoodie featuring Ohn's legacy.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789104", name: "Epic Saga Hoodie", description: "A hoodie celebrating the epic sagas of Lunatic and Throne.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789105", name: "Throne's Frost Hoodie", description: "A hoodie inspired by the frost of Throne's north.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789106", name: "Lunatic's Flame Hoodie", description: "A hoodie that captures the essence of Lunatic's fiery spirit.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789107", name: "Queen of Night Hoodie", description: "A hoodie that symbolizes the power of the Queen of Night.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789108", name: "Throne's Keeper Hoodie", description: "A hoodie dedicated to the keepers of Throne's secrets.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789109", name: "Dark Forest Hoodie", description: "A cozy hoodie inspired by the dark forests of Lunatic.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789110", name: "Throne's Guardians Hoodie", description: "A hoodie featuring the guardians of Throne.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789111", name: "Ohn's Courage Hoodie", description: "A hoodie representing Ohn's courage.", price: 49.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789112", name: "Epic Journey Hoodie", description: "A cozy hoodie for epic journeys.", price: 44.99, category: "Hoodies" },
    { id: "e1f2g3h4-80a2-5c4e-b49a-123456789113", name: "Lunatic's Rebellion Hoodie", description: "A hoodie representing the rebellion in Lunatic's realm.", price: 49.99, category: "Hoodies" },
  
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789012", name: "Vaara's Shadow Mouse Pad", description: "A sleek mouse pad featuring the shadowy figure of Vaara.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789013", name: "Lunatic World Map Mouse Pad", description: "An artistic representation of the Lunatic world map.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789014", name: "Felix the Tyrant Mouse Pad", description: "A mouse pad showcasing Felix in his tyrannical glory.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789015", name: "Queen of Flowers Mouse Pad", description: "A beautiful mouse pad featuring the Queen of Flowers.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789016", name: "Zeya the Warrior Mouse Pad", description: "A dynamic mouse pad depicting Zeya in action.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789017", name: "Epic Battle Scenes Mouse Pad", description: "A mouse pad illustrating epic battle scenes from Throne.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789018", name: "Lunatic's Magical Creatures Mouse Pad", description: "A colorful mouse pad featuring magical creatures from Lunatic.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789019", name: "Guardians of the Realm Mouse Pad", description: "A mouse pad showcasing the guardians from both games.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789020", name: "Emblems of Hope Mouse Pad", description: "An inspiring mouse pad featuring emblems of hope.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789021", name: "Dreamy Lunatic Mouse Pad", description: "A whimsical mouse pad showcasing dreamy scenes from Lunatic.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789022", name: "Throne Legacy Mouse Pad", description: "A mouse pad highlighting the legacy of Throne.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789023", name: "Mythical Adventures Mouse Pad", description: "A mouse pad featuring various mythical adventures from the games.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789024", name: "Vaara's Powers Mouse Pad", description: "A mouse pad depicting the powers of Vaara in action.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789025", name: "Throne Alliances Mouse Pad", description: "A mouse pad showcasing the alliances formed in Throne.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789026", name: "Epic Heroes Mouse Pad", description: "A mouse pad featuring the epic heroes from both games.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789027", name: "Throne's Frozen Landscape Mouse Pad", description: "A mouse pad showcasing the frozen landscapes of Throne.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789028", name: "Lunatic's Dark Secrets Mouse Pad", description: "A mysterious mouse pad featuring dark secrets from Lunatic.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789029", name: "Magical Realms Mouse Pad", description: "A mouse pad depicting the magical realms from both games.", price: 19.99, category: "Desk" },
    { id: "i1j2j3k4-80a1-4e8c-8b60-123456789030", name: "Legendary Quests Mouse Pad", description: "A mouse pad featuring legendary quests from Lunatic and Throne.", price: 19.99, category: "Desk" },

  ];
}


