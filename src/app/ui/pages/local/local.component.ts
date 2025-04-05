import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { MenuItem, MessageService } from 'primeng/api';
import { LocalService } from '../../../core/service/local/local.service';
import { HeroComponent } from '../../common/hero/hero.component';
import { TableComponent } from '../../common/table/table.component';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-local',
  imports: [
    NavbarComponent,
    HeroComponent,
    TableComponent,
    SpinnerComponent,
    ButtonModule,
    Dialog,
    InputTextModule,
    FileUploadModule,
  ],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css',
})
export class LocalComponent implements OnInit {
  visible: boolean = false;
  localService = inject(LocalService);
  messageService = inject(MessageService);
  itemsBreadcrumb: MenuItem[] = [];
  ngOnInit() {
    if (this.localService.dataComp().length === 0) {
      this.localService.getTracks();
    }
    this.itemsBreadcrumb = [{ label: 'Home', route: '/' }, { label: 'LAN' }];
  }
  showDialog() {
    this.visible = true;
  }
  addTrack(trackFile: FileUpload, trackName: string, artistFile: FileUpload, artistName: string) {
    this.localService.addTrack(trackFile.files[0], trackName, artistFile.files[0], artistName).subscribe({
      next: () => {
        this.localService.getTracks();
      },
      error: () => {
        this.messageService.add({severity:'error', summary: `Errore di caricamento`, detail: `Impossibile caricare la canzone`});
        this.visible = false;
      },
      complete: () => {
        this.messageService.add({severity:'success', summary: `${trackName} - ${artistName}`, detail: `Canzone caricata correttamente`});
        this.visible = false;
      }
    });
  }
}
