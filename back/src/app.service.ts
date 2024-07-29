import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entities';

@Injectable()
export class AppService {
  private todoList: Todo[] = [
    {
      id: 1,
      title: 'test',
      status: false,
    },
  ];

  private id_count = 1;

  async findAll(): Promise<Todo[]> {
    return this.todoList;
  }

  async updateTodo(id: number, newStatus: boolean): Promise<Todo> {
    const todo = this.todoList.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.status = newStatus;
    return todo;
  }

  async addTodo(title: string): Promise<Todo> {
    const newTodo: Todo = {
      id: ++this.id_count,
      title,
      status: false,
    };
    this.todoList.push(newTodo);
    return newTodo;
  }

  async deleteTodo(id: number): Promise<void> {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todoList.splice(index, 1);
  }
}
