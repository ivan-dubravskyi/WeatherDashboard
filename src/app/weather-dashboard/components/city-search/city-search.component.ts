import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent {
  cityName = new FormControl('', Validators.required)

  @Output() searchCity = new EventEmitter<string>();

  onSearch() {
    const city = this.cityName.value;
    if (city) {
      this.searchCity.emit(city);
      this.cityName.reset();
    }
  }

}
