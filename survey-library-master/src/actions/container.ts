import { property, propertyArray } from "../jsonobject";
import { Base } from "../base";
import { IAction, Action, BaseAction } from "./action";
import { CssClassBuilder } from "../utils/cssClassBuilder";
import { ILocalizableOwner, LocalizableString } from ".././localizablestring";
import { mergeValues } from "../utils/utils";

export let defaultActionBarCss = {
  root: "sv-action-bar",
  defaultSizeMode: "sv-action-bar--default-size-mode",
  smallSizeMode: "sv-action-bar--small-size-mode",
  item: "sv-action-bar-item",
  itemWithTitle: "",
  itemAsIcon: "sv-action-bar-item--icon",
  itemActive: "sv-action-bar-item--active",
  itemPressed: "sv-action-bar-item--pressed",
  itemIcon: "sv-action-bar-item__icon",
  itemTitle: "sv-action-bar-item__title",
  itemTitleWithIcon: "sv-action-bar-item__title--with-icon",
};

export class ActionContainer<T extends BaseAction = Action> extends Base implements ILocalizableOwner {
  public getMarkdownHtml(text: string, name: string): string {
    return !!this.locOwner ? this.locOwner.getMarkdownHtml(text, name) : undefined;
  }
  public getRenderer(name: string): string {
    return !!this.locOwner ? this.locOwner.getRenderer(name) : null;
  }
  public getRendererContext(locStr: LocalizableString): any {
    return !!this.locOwner ? this.locOwner.getRendererContext(locStr) : locStr;
  }
  public getProcessedText(text: string): string {
    return this.locOwner ? this.locOwner.getProcessedText(text) : text;
  }
  public getLocale(): string {
    return !!this.locOwner ? this.locOwner.getLocale() : "";
  }
  @propertyArray({
    onSet: (_: any, target: ActionContainer<Action>) => {
      target.onSet();
    },
    onPush: (item: any, i: number, target: ActionContainer<Action>) => {
      target.onPush(item);
    },
    onRemove: (item: any, i: number, target: ActionContainer<Action>) => {
      target.onRemove(item);
    }
  })
  actions: Array<T>;
  private cssClassesValue: any;

  protected getRenderedActions(): Array<T> {
    return this.actions;
  }

  public updateCallback: (isResetInitialized: boolean) => void;
  @property({}) containerCss: string;
  public sizeMode: "default" | "small" = "default";
  public locOwner: ILocalizableOwner;
  @property({ defaultValue: false }) isEmpty: boolean;

  public locStrsChanged(): void {
    super.locStrsChanged();
    this.actions.forEach(item => {
      if(item.locTitle) item.locTitle.strChanged();
      item.locStrsChanged();
    });
  }
  protected raiseUpdate(isResetInitialized: boolean) {
    this.isEmpty = !this.actions.some((action) => action.visible);
    this.updateCallback && this.updateCallback(isResetInitialized);
  }

  protected onSet() {
    this.actions.forEach((item) => { this.setActionCssClasses(item); });
    this.raiseUpdate(true);
  }
  protected onPush(item: T) {
    this.setActionCssClasses(item);
    item.owner = this;
    this.raiseUpdate(true);
  }

  protected onRemove(item: T) {
    item.owner = null;
    this.raiseUpdate(true);
  }

  private setActionCssClasses(item: T) {
    item.cssClasses = this.cssClasses;
  }

  public get hasActions(): boolean {
    return (this.actions || []).length > 0;
  }

  public get renderedActions(): Array<T> {
    return this.getRenderedActions();
  }

  get visibleActions(): Array<T> {
    return this.actions.filter((action) => action.visible !== false);
  }
  public getRootCss(): string {
    const sizeModeClass = this.sizeMode === "small" ? this.cssClasses.smallSizeMode : this.cssClasses.defaultSizeMode;
    return new CssClassBuilder().append(this.cssClasses.root + (!!sizeModeClass ? " " + sizeModeClass : "") + (!!this.containerCss ? " " + this.containerCss : ""))
      .append(this.cssClasses.root + "--empty", this.isEmpty)
      .toString();
  }
  protected getDefaultCssClasses(): any {
    return defaultActionBarCss;
  }
  public set cssClasses(val: any) {
    this.cssClassesValue = {};
    this.copyCssClasses(this.cssClassesValue, this.getDefaultCssClasses());
    mergeValues(val, this.cssClasses);
    this.actions.forEach((action: T) => {
      this.setActionCssClasses(action);
    });
  }
  public get cssClasses(): any {
    if(!this.cssClassesValue) {
      this.cssClassesValue = this.getDefaultCssClasses();
    }
    return this.cssClassesValue;
  }
  private createAction(item: IAction): T {
    return <T>(item instanceof BaseAction ? item : new Action(item));
  }
  public addAction(val: IAction, sortByVisibleIndex = true): T {
    const res: T = this.createAction(val);
    this.actions.push(<T>res);
    this.sortItems();
    return res;
  }
  private sortItems(): void {
    this.actions = []
      .concat(this.actions.filter((item) => item.visibleIndex === undefined || item.visibleIndex >= 0))
      .sort((firstItem, secondItem) => {
        return firstItem.visibleIndex - secondItem.visibleIndex;
      });
  }

  public setItems(items: Array<IAction>, sortByVisibleIndex = true): void {
    this.actions = <any>items.map((item) => this.createAction(item));
    if (sortByVisibleIndex) {
      this.sortItems();
    }
  }
  public initResponsivityManager(container: HTMLDivElement, delayedUpdateFunction?: (callback: () => void) => void): void {
    return;
  }
  public resetResponsivityManager(): void { }
  public getActionById(id: string): T {
    for (var i = 0; i < this.actions.length; i++) {
      if (this.actions[i].id === id) return this.actions[i];
    }
    return null;
  }
  public dispose(): void {
    super.dispose();
    this.actions.forEach(action => action.dispose());
    this.actions.length = 0;
  }
}
