export interface NodeInterface {
  id: string;
  name: string;
  label: string;
  color: string;
  isTrafficLight: boolean;

  changeName (name: string): void;

  connectTo (node: NodeInterface): void;

  remove (): void;
}
