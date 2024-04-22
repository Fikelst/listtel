import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { COUNTRY_CODES } from './country-codes';

interface Contact {
  name: string;
  countryCode: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'listakon';
  name: string = ''; // Pole przechowujące imię i nazwisko
  selectedCountryCode: string = '1'; // Pole przechowujące wybrany numer kierunkowy (domyślnie dla USA)
  phoneNumber: string = ''; // Pole przechowujące numer telefonu
  contacts: Contact[] = []; // Tablica przechowująca kontakty

  countryCodes = COUNTRY_CODES; // Import listy kierunkowych numerów z zewnętrznego pliku

  onNameKeyDown(event: KeyboardEvent) {
    // Pobierz kod klawisza
    const key = event.key;

    // Sprawdź czy wprowadzony znak jest literą lub klawiszem kontroli (Backspace, Delete, strzałki)
    if (!/^[a-zA-Z]$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
      // Jeśli wprowadzony znak nie jest literą ani klawiszem kontroli, zapobiegnij domyślnej akcji
      event.preventDefault();
    }
  }

  onPhoneNumberKeyDown(event: KeyboardEvent) {
    // Pobierz kod klawisza
    const key = event.key;

    // Sprawdź czy wprowadzony znak jest cyfrą lub klawiszem kontroli (Backspace, Delete, strzałki)
    if (!/^[0-9]$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
      // Jeśli wprowadzony znak nie jest cyfrą ani klawiszem kontroli, zapobiegnij domyślnej akcji
      event.preventDefault();
    }
  }

  isValidName(name: string): boolean {
    // Sprawdź czy imię i nazwisko zawierają tylko litery
    return /^[a-zA-Z]+$/.test(name);
  }

  addToContacts() {
    // Dodaj nowy kontakt do listy
    if (this.name && this.phoneNumber) {
      this.contacts.push({ name: this.name, countryCode: this.selectedCountryCode, phoneNumber: this.phoneNumber });
      // Zresetuj pola imienia i numeru telefonu po dodaniu do listy
      this.name = '';
      this.phoneNumber = '';
    }
  }
}