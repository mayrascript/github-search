import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  @Output() valueSubmitted = new EventEmitter<string>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  search() {
    const { username } = this.form.value;
    this.valueSubmitted.emit(username);
  }
  private buildForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
    });
  }
}
