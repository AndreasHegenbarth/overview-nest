import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(() => Promise.resolve({ id: 1, username: 'test', password: 'test', email: 'test@test.com' })),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: 1, username: 'test', password: 'test', email: 'test@test.com' });
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      await controller.remove('1');
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });
});

