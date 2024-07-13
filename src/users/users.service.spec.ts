import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        {
          id: 1,
          username: 'test',
          password: 'test',
          email: 'test@test.com',
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(expectedUsers);

      const users = await service.findAll();

      expect(users).toEqual(expectedUsers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expectedUser = {
        id: 1,
        username: 'test',
        password: 'test',
        email: 'test@test.com',
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedUser);

      const user = await service.findOne(1);

      expect(user).toEqual(expectedUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
