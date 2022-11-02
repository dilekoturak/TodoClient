import { TodoListService } from 'src/app/services/todolist.service';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private todoListService: TodoListService) { 
                const img = _renderer.createElement("img");
                img.setAttribute("src", "../../../../../assets/delete.png")
                img.setAttribute("style", "cursor: pointer")
                img.width = 25
                img.heigth = 25
                _renderer.appendChild(element.nativeElement, img)
  }

  @Input() id: string | undefined
  @Output() pendingCallback: EventEmitter<any> = new EventEmitter()
  @Output() overdueCallback: EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onClick() {    
    if (this.id) {
      const td: HTMLTableCellElement = this.element.nativeElement
      await this.todoListService.delete(this.id)
      $(td.parentElement).fadeOut(1000, () => {
        this.pendingCallback.emit()
        this.overdueCallback.emit()
      })
    }
  }

}
