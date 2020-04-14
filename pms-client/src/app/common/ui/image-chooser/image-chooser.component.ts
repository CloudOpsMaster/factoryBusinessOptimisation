import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageDescription } from './model/image-description';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
   // tslint:disable-next-line:component-selector
   selector: 'image-chooser',
   templateUrl: './image-chooser.component.html',
   styleUrls: ['./image-chooser.component.css']
})
export class ImageChooserComponent implements OnInit {

   @Input() imageBase64: string;
   @Input() readonly: boolean;
   @Input() caption = 'Picture';
   @Output() imageChanged = new EventEmitter<ImageDescription>();

   trustedImageUrl: SafeUrl;

   constructor(private sanitizer: DomSanitizer) { }

   ngOnInit() {
      if (this.imageBase64 && this.imageBase64.length > 0) {
         this.trustedImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.imageBase64);
      }
   }

   onModelChange(path: any) {
      const file: File = path.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
         const selectedFile = new ImageDescription(event.target.result, file);
         this.trustedImageUrl = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
         this.imageChanged.emit(selectedFile);
      });

      reader.readAsDataURL(file);
   }

}
