import {IconInterface} from "src/app/primitives/PrimitivesModels";

export interface NavSpace {
  title: string;
  icon: IconInterface
  links: NavLink[],
}

export interface NavLink {
  title: string;
  icon: IconInterface;
  route: string;
}

