import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent {
  cityName = new FormControl('', Validators.required)

  @Output() addCity = new EventEmitter<string>();

  onAdd() {
    const name = this.cityName.value;
    if (name) {
      this.addCity.emit(name);
      this.cityName.reset();
    }
  }
}
