import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  dataSaved = false;
  bookForm: any;
  allBooks: Book[];
  massage = "";

  constructor(private formbulider: FormBuilder, private bookService: BookService) { }

  ngOnInit() {
    this.bookForm = this.formbulider.group({
      Author: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
    this.loadAllBooks();
  }
  loadAllBooks() {
    //this.allBooks = this.bookService.getAllBooks();
    this.bookService.getAllBooks().subscribe((data) => {
      this.allBooks = data;
      console.log(data);
    });
    console.log(this.allBooks);
  }
  onFormSubmit() {
    this.dataSaved = false;
    const book = this.bookForm.value;
    this.AddBook(book);
    this.bookForm.reset();
  }
  AddBook(book: Book) {

    this.bookService.addBook(book).subscribe(
        () => {
          this.dataSaved = true;
        this.massage = 'Record saved Successfully';
        this.loadAllBooks();
        this.bookForm.reset();
        }
      );
    
  }
 
  resetForm() {
    this.bookForm.reset();
    this.massage = "";
    this.dataSaved = false;
  }
}
