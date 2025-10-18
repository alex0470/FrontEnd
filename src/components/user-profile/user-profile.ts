import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class UserProfileComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  userForm!: FormGroup;
  showFormOverlay = false;
  isLoading = false;
  editingUserId: number | null = null;
  searchTerm: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null],
      email: ['', [Validators.required, Validators.email]],
      role: ['User'],
      activo: [true]
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = Array.isArray(data) ? data : (data?.users || []);

        this.applyFilter();

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.id.toString().includes(term)
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilter();
  }

  openCreateForm() {
    this.showFormOverlay = true;
    this.editingUserId = null;
    this.userForm.reset({ role: 'User', activo: true });
  }

  openEditForm(user: any) {
    this.editingUserId = user.id;
    this.showFormOverlay = true;
    this.userForm.setValue({
      nombre: user.nombre || '',
      email: user.email || '',
      role: user.role || 'User',
      activo: user.activo ?? true,
      edad: user.edad ?? null
    });
  }


  closeForm() {
    this.showFormOverlay = false;
    this.editingUserId = null;
    this.userForm.reset({
      nombre: '',
      email: '',
      role: 'User',
      activo: true,
      edad: null
    });
  }


  saveUser() {
    const userData = this.userForm.value;

    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, userData).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === this.editingUserId);
          if (index !== -1) this.users[index] = updatedUser;
          this.applyFilter();
          this.closeForm();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: (newUser) => {
          this.users.push(newUser);
          this.applyFilter();
          this.closeForm();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('¿Eliminar usuario?')) {

      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.applyFilter();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
