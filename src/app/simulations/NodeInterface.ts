import { PositionInterface } from 'src/app/primitives/PrimitivesModels'

export interface NodeInterface {
  id: string;
  name: string;
  label: string;
  color: string;
  isTrafficLight: boolean;
  position: PositionInterface;

  changeName (name: string): void;

  connectTo (node: NodeInterface): void;

  remove (): void;
}
