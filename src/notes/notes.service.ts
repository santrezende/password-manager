import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(body: CreateNoteDto, user: User) {
    const { id } = user;
    await this.findWithTitle(body, id);
    return await this.notesRepository.create(body, user);
  }

  async findAll(user: User) {
    return await this.notesRepository.findAll(user);
  }

  async findOne(id: number, user: User) {
    return await this.validateNote(id, user);
  }

  async remove(id: number, user: User) {
    await this.validateNote(id, user);
    return await this.notesRepository.remove(id, user);
  }

  async validateNote(id: number, user: User) {
    const note = await this.notesRepository.findOne(id);
    if (!note) throw new NotFoundException();
    if (note.userId !== user.id) {
      throw new ForbiddenException();
    }

    return note;
  }

  async findWithTitle(body: CreateNoteDto, userId: number) {
    const note = await this.notesRepository.findWithTitle(body, userId);
    if (note) throw new ConflictException('Title is not available');
  }
}
