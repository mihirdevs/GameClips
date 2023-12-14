import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements AfterContentInit{

  @ContentChildren(TabComponent) tabs : QueryList<TabComponent> = new QueryList()

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter(tab=>tab.activeTab)

    if(!activeTabs || activeTabs.length === 0){
      this.selectTab(this.tabs!.first)
    }
  }

  selectTab(tab:TabComponent){
    this.tabs?.forEach(tab => {
      tab.activeTab = false
    })
    tab.activeTab = true

    return false
  }
}
