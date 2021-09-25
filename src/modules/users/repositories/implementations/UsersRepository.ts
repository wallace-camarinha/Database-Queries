import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    
    const user = await this.repository.findOne({ where: {id: user_id}, relations: ['games']})

    if(!user) {
      throw new Error('User not found!')
    }

    return user

    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query(`
      SELECT *
      FROM users
      ORDER BY first_name
    `); 
    
    return users
    
    // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstName = first_name.toLowerCase()
    const lastName = last_name.toLowerCase()

    const users = await this.repository.query( `
      SELECT * 
      FROM users
      WHERE first_name iLIKE $1 AND last_name iLIKE $2
    `,
    [
      firstName,
      lastName,
    ]);

    return users
    
    // Complete usando raw query
  }
}
