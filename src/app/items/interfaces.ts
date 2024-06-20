export interface Item {
  id: string;
  name: string;
  fruit: ItemFruit;
  flag: boolean;
}

export enum ItemFruit {
  Apple = 'apple',
  Banana = 'banana',
  Blueberry = 'blueberry',
  Cherry = 'cherry',
  Kiwi = 'kiwi',
}

export interface ItemsState {
  list: {
    data: Item[];
    isLoading: boolean;
  };
  selectedItem: {
    data: Item;
    isLoading: boolean;
  };
}
