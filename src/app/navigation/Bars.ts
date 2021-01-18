import {NavLink, NavSpace} from "src/app/navigation/BarsModels";
import {IconInterface} from "src/app/primitives/PrimitivesModels";

export class NavNamespace implements NavSpace {
  private readonly _icon: IconInterface;
  private readonly _links: NavLink[];
  private readonly _title: string;

  constructor(title: string, icon: IconInterface) {
    this._icon = icon;
    this._links = [];
    this._title = title;
  }

  get icon(): IconInterface {
    return this._icon;
  }

  get links(): NavLink[] {
    return this._links;
  }

  get title(): string {
    return this._title;
  }

  public addLink(navLink: NavLink) : void {
    this._links.push(navLink);
  }
}

export class NavModelLink implements NavLink {
  private readonly _icon: IconInterface;
  private readonly _title: string;
  private readonly _route: string;

  constructor(title: string, icon: IconInterface, route: string) {
    this._title = title;
    this._icon = icon;
    this._route = route;
  }


  get icon(): IconInterface {
    return this._icon;
  }

  get title(): string {
    return this._title;
  }

  get route(): string {
    return this._route;
  }
}
