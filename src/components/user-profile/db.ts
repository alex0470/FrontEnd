export interface Usuario {
  id: number;
  name: string;
  age: string;
  email: string;
}

export class db {
  usersList: Usuario[] = [];

  constructor() {
    const data = localStorage.getItem('usersList');
    this.usersList = data ? JSON.parse(data) : [
      { id: 1, name: 'Jose Perez', age: '25', email: 'jose.perez@example.com' },
      { id: 2, name: 'Juan Lopez', age: '22', email: 'juan.lopez@example.com' },
      { id: 3, name: 'Miguel Hernandez', age: '23', email: 'miguel.hernandez@example.com' }
    ];
  }

  save() { 
    localStorage.setItem('usersList', JSON.stringify(this.usersList));
  }

  count() {
    return this.usersList.length;
  }

  getAll(): Usuario[] {
    return this.usersList;
  }

  getById(id: number): Usuario | undefined {
    return this.usersList.find(u => u.id === id);
  }

  add(user: { name: string; age: string; email: string }) {
    const newId = this.usersList.length > 0
      ? Math.max(...this.usersList.map(u => u.id)) + 1
      : 1;
    this.usersList.push({ id: newId, ...user });
    this.save();
  }

  update(id: number, data: { name?: string; age?: string; email?: string }) {
    const user = this.getById(id);
    if (user) {
      user.name = data.name ?? user.name;
      user.age = data.age ?? user.age;
      user.email = data.email ?? user.email;
      this.save();
    }
  }

  delete(id: number) {
    this.usersList = this.usersList.filter(u => u.id !== id);
    this.save();
  }
}